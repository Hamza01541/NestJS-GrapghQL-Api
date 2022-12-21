import { env, load, loadDotEnv } from "@makeit-studio/env";
import { bootstrapNestServer } from "./bootstrap";

(async function () {
  await load([loadDotEnv({ path: ".env.local" })]);

  const server = await bootstrapNestServer();

  await import("./lib/logger").then(({ logger }) =>
    logger.info("Running in standard server mode.")
  );

  await server?.app.listen(env([["PORT", "port"]]).port, "localhost");
})();
