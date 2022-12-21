export class AppConfig {
  systemConfig: {
    executionContext: string;
    isLambda: boolean;

    database: string;
    uri?: string;
    user?: string;
    password?: string;
    host?: string;
    sessionToken: string;
  };

  aws: {
    region: string;
    userPoolId: string;
    clientId: string;
    identityPoolId: string;
  };
}
