import { env } from "@makeit-studio/env";
import { AppConfig } from "../../lib/app-config";

let appConfig: AppConfig;

export const appConfigProvider = {
  provide: AppConfig,
  useFactory: async () => {
    if (appConfig) {
      return appConfig;
    }

    appConfig = {
      ...env([
        ["EXECUTION_CONTEXT", "systemConfig.executionContext"],
        ["MONGO_URL", "systemConfig.uri"],
        ["MONGO_DB", "systemConfig.database"],
        ["AWS_ACCESS_KEY_ID", "systemConfig.user"],
        ["AWS_SECRET_ACCESS_KEY", "systemConfig.password"],
        ["MONGO_HOST", "systemConfig.host"],
        ["AWS_SESSION_TOKEN", "systemConfig.sessionToken"],

        ["AWS_REGION", "aws.region"],
        ["AWS_COGNITO_USER_POOL_ID", "aws.userPoolId"],
      ]),
    };

    appConfig.systemConfig.isLambda =
      appConfig.systemConfig.executionContext === "lambda";

    return appConfig;
  },
};
