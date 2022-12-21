import { load, loadEnv, env } from "@makeit-studio/env";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import awsLambdaFastify from "aws-lambda-fastify";
import { FastifyServerOptions, FastifyInstance, fastify } from "fastify";

import { AppModule } from "./app.module";

type NestServer = {
  app: NestFastifyApplication;
  instance: FastifyInstance;
};

let nestServer: NestServer;

export const bootstrapNestServer = async (): Promise<NestServer> => {
  if (nestServer) {
    return nestServer;
  }

  await load([loadEnv()]);

  const serverOptions: FastifyServerOptions = {
    logger: env([["LOG_LEVEL", "level"]]),
  };
  const instance: FastifyInstance = fastify(serverOptions);
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(instance)
  );

  // With Apollo, this is done on the Apollo server init
  // app.enableCors();

  nestServer = { app, instance };

  return nestServer;
};

export const runLambdaHandler = async (event, context) => {
  const { app, instance } = await bootstrapNestServer();

  await import("./lib/logger").then(({ logger }) =>
    logger.info("Running in serverless mode.")
  );

  await app.init();

  const handler = awsLambdaFastify(instance);

  return handler(event, context);
};
