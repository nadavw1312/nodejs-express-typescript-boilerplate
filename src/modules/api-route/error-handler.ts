import { Request, Response } from "express";
import * as httpStatus from "http-status";
import logger from "../../utils/logger";
import config from "../../config/config";

const errorHandler = (req: Request, res: Response, error, returnDetails) => {
  let resSent = false;
  try {
    // !TODO: Log error to database and return error id
    const errorId = "";

    if (returnDetails) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ errorId });
      resSent = true;
    } else if (error.statusCode) {
      res.status(error.statusCode).send(error.message || httpStatus[error.statusCode]);
      resSent = true;
    }
  } catch (e) {
    logger.warn("Error in error handler", e);
  } finally {
    logger.info(error);
    if (!resSent) {
      const message = config.isDev ? httpStatus[httpStatus.INTERNAL_SERVER_ERROR] : httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(message);
    }
  }
};

export default errorHandler;
