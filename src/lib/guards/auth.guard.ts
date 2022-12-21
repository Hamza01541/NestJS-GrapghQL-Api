import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Context } from "../context";
import { AuthService } from "../../modules/account/auth.service";

const extractToken = (value: string, prefix = "Bearer "): string => {
  const fragments = value.split(prefix);

  return fragments[fragments.length - 1] || "";
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly _authService: AuthService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const appContext =
      GqlExecutionContext.create(context).getContext<Context>();
    const headers = appContext.request.headers;
    const idToken = extractToken(
      (headers["x-authorization"] as string) ||
      headers.authorization ||
      (headers.Authorization as string) ||
      ""
    );

    appContext.userSession = await this._authService.tokenIdentify(idToken);

    return true;
  }
}
