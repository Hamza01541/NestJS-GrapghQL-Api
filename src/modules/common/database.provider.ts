import {
  bootstrap as bootstrapDB,
  MongoConnectionOptions,
  MongoDatabase,
} from "@makeit-studio/database";
import { AppConfig } from "../../lib/app-config";

const bootstrapper = (opts: AppConfig["systemConfig"]) => {
  if (!opts.isLambda) {
    return bootstrapDB(opts.uri as string, opts.database as string);
  }

  return bootstrapDB(opts as MongoConnectionOptions);
};

let mongoDatabase: MongoDatabase;

export const databaseProvider = {
  provide: MongoDatabase,
  useFactory: async (appConfig: AppConfig) => {
    if (!mongoDatabase) {
      mongoDatabase = await bootstrapper(appConfig.systemConfig);
    }

    return mongoDatabase;
  },
  inject: [AppConfig],
};
