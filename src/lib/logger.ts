import { env } from "@makeit-studio/env";
import { Logger, makeLogger } from "@makeit-studio/logger";

export const logger: Logger = makeLogger(
  "@makeit-studio/greenomy-lender-api-backend",
  env([["LOG_LEVEL", "level", (value) => value ?? "debug"]])
);

export default logger;
