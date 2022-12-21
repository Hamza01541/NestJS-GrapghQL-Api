import { Injectable } from "@nestjs/common";
import AWS from "aws-sdk";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { verify, JwtPayload } from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import fetch from "node-fetch";
import jwkToPem from "jwk-to-pem";
import {
  BadCredentialsError,
  DeleteUserError,
  InvalidTokenError,
  SignUpFailedError,
  UpdateEmailError,
  UpdatePasswordError,
} from "../../lib/errors";
import { AppConfig } from "../../lib/app-config";
import { UserSessionDto } from "./dto/user-session.dto";
import { UserIdentity } from "./dal/user-identity";

type PemMap = { [k: string]: string };

const cognitoUserSessionToToken = (
  session: AmazonCognitoIdentity.CognitoUserSession
): UserSessionDto => {
  const idToken = session.getIdToken();
  const payload = idToken.decodePayload() || {};

  return {
    localId: payload["cognito:username"],
    email: payload.email,
    idToken: idToken.getJwtToken(),
    refreshToken: session.getRefreshToken().getToken(),
    expiresIn: idToken.getExpiration().toString(),
    // displayName?: string;
    // registered?: boolean;
  };
};

const getPublicKeys = async (issuer: string): Promise<PemMap> => {
  const url = `${issuer}/.well-known/jwks.json`;
  const publicKeys: any = await fetch(url).then((res) => res.json());
  const keys: PemMap = publicKeys.keys.reduce((acc: any, curr: any) => {
    const pem = jwkToPem(curr);

    acc[curr.kid] = pem;

    return acc;
  }, {});

  return keys;
};

const attr = (obj: { Name: string; Value: string }) =>
  new AmazonCognitoIdentity.CognitoUserAttribute(obj);

@Injectable()
export class AuthService {
  private readonly _cognitoIdentityServiceProvider: AWS.CognitoIdentityServiceProvider;

  private readonly _userPool: AmazonCognitoIdentity.CognitoUserPool;

  private readonly _idpIssuer: string;

  private _pemsByKid: PemMap;

  constructor(private readonly _config: AppConfig) {
    this._idpIssuer = `https://cognito-idp.${this._config.aws.region}.amazonaws.com/${this._config.aws.userPoolId}`;

    AWS.config.update({
      region: this._config.aws.region,
    });

    this._cognitoIdentityServiceProvider =
      new AWS.CognitoIdentityServiceProvider();
    this._userPool = new AmazonCognitoIdentity.CognitoUserPool({
      UserPoolId: this._config.aws.userPoolId,
      ClientId: this._config.aws.clientId,
    });
  }

  loginWithEmailPassword(
    email: string,
    password: string
  ): Promise<UserSessionDto> {
    return new Promise((resolve, reject) => {
      const authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: email,
        Password: password,
      });
      const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: email,
        Pool: this._userPool,
      });

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: (session) => resolve(cognitoUserSessionToToken(session)),
        onFailure: () => reject(BadCredentialsError()),
      });
    });
  }

  loginWithRefreshToken(refreshToken: string): Promise<UserSessionDto> {
    return new Promise((resolve, reject) => {
      const _refreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({
        RefreshToken: refreshToken,
      });
      const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: "",
        Pool: this._userPool,
      });

      cognitoUser.refreshSession(_refreshToken, (err, session) => {
        if (err) {
          return reject(BadCredentialsError());
        }

        return resolve(cognitoUserSessionToToken(session));
      });
    });
  }

  // @NOTE: see https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html
  //        for step by step explanation
  async tokenIdentify(token: string): Promise<UserSessionDto> {
    const tokenSections = (token || "").split(".");

    if (tokenSections.length < 2) {
      throw InvalidTokenError("Invalid token");
    }

    const tokenHeaderJson = Buffer.from(tokenSections[0], "base64").toString(
      "utf8"
    );
    const tokenHeader = JSON.parse(tokenHeaderJson);

    if (!this._pemsByKid) {
      this._pemsByKid = await getPublicKeys(this._idpIssuer);
    }

    const pem = this._pemsByKid[tokenHeader.kid];

    if (!pem) {
      throw InvalidTokenError("Unknown kid");
    }

    const claim = verify(token, pem, { algorithms: ["RS256"] }) as JwtPayload;

    if (!claim) {
      throw InvalidTokenError("Invalid claims");
    }

    const currentSeconds = Math.floor(new Date().valueOf() / 1000);

    if (currentSeconds > (claim?.exp || 0)) {
      throw InvalidTokenError("Token Expired");
    }

    if (claim?.iss !== this._idpIssuer) {
      throw InvalidTokenError("Invalid claim issuer");
    }

    if (claim?.aud !== this._config.aws.clientId) {
      throw InvalidTokenError("Invalid claim audience");
    }

    if (claim?.token_use !== "id") {
      throw InvalidTokenError("Invalid claim token_use");
    }

    return {
      localId: claim["cognito:username"],
      email: claim?.email,
      idToken: token,
      expiresIn: `${claim?.exp || 0}`,
      refreshToken: "",
    };
  }

  createUser(
    email: string,
    password: string,
    autoConfirm = false
  ): Promise<UserIdentity> {
    return new Promise((resolve, reject) => {
      const username = uuid();

      this._userPool.signUp(
        username,
        password,
        [
          attr({
            Name: "email",
            Value: email,
          }),
        ],
        [],
        (err) => {
          if (err) {
            reject(SignUpFailedError());

            return;
          }

          const userIdentity: UserIdentity = {
            uid: username || "",
            email,
          };

          if (!autoConfirm) {
            resolve(userIdentity);

            return;
          }

          this._cognitoIdentityServiceProvider.adminConfirmSignUp(
            {
              UserPoolId: this._config.aws.userPoolId,
              Username: username,
            },
            (confirmError) => {
              if (confirmError) {
                reject(SignUpFailedError());

                return;
              }

              this._cognitoIdentityServiceProvider.adminUpdateUserAttributes(
                {
                  UserAttributes: [
                    {
                      Name: "email_verified",
                      Value: "true",
                    },
                  ],
                  UserPoolId: this._config.aws.userPoolId,
                  Username: username,
                },
                (updateAttrError) => {
                  if (updateAttrError) {
                    return reject(SignUpFailedError());
                  }

                  return resolve(userIdentity);
                }
              );
            }
          );
        }
      );
    });
  }

  updatePassword(uid: string, password: string): Promise<UserIdentity> {
    return new Promise((resolve, reject) => {
      this._cognitoIdentityServiceProvider.adminSetUserPassword(
        {
          Username: uid,
          UserPoolId: this._config.aws.userPoolId,
          Permanent: true,
          Password: password,
        },
        (err) => {
          if (err) {
            return reject(UpdatePasswordError());
          }

          return resolve({
            uid,
            email: "",
          });
        }
      );
    });
  }

  updateEmail(uid: string, email: string): Promise<UserIdentity> {
    return new Promise((resolve, reject) => {
      this._cognitoIdentityServiceProvider.adminUpdateUserAttributes(
        {
          Username: uid,
          UserPoolId: this._config.aws.userPoolId,
          UserAttributes: [
            {
              Name: "email",
              Value: email,
            },
          ],
        },
        (err) => {
          if (err) {
            return reject(UpdateEmailError());
          }

          return resolve({ uid, email });
        }
      );
    });
  }

  deleteUser(uid: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this._cognitoIdentityServiceProvider.adminDeleteUser(
        {
          Username: uid,
          UserPoolId: this._config.aws.userPoolId,
        },
        (err) => {
          if (err) {
            return reject(DeleteUserError());
          }

          return resolve();
        }
      );
    });
  }
}
