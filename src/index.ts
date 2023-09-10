import app from "./app";
import config from "./config/config";
import logger from "./modules/logger/logger";

let server: any;

const startServer = async () => {
  // connect to db
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
};

startServer();
