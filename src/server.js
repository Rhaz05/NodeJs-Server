import express from "express";
import morgan from "morgan";
import "dotenv/config";
import { logger } from "../src/util/logger.util.js";
import { CONFIG } from "../src/config/env.config.js";
import { initRoutes } from "../src/startup/routes.startup.js";
import { CheckConnection } from "../src/db/db.js";
import { initSession } from "../src/startup/session.startup.js";

const app = express();

const serverStart = () => {
  logger.info("--------------------Server starting--------------------");
  logger.info(`Running application on ${CONFIG.NODE_ENV} Environment`);

  logger.info("Initializing database connection");
  CheckConnection();
  initSession(app);

  logger.info("Importing middlewares");
  app.use(morgan("dev"));
  app.use(express.json());

  logger.info("Importing routes");
  initRoutes(app);

  app.listen(process.env.PORT, () => {
    logger.info(`Server running on http://localhost:${process.env.PORT}`);
  });
};

serverStart();
