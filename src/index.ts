import app from "./app";
import config from "./config/config";
import logger from "./utils/logger";
import * as http from "http";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let server: http.Server;

const startServer = async () => {
  // connect to db
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
};

startServer();
