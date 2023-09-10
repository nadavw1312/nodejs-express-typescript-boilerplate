import { Request, Response } from "express";
import httpStatus from "http-status";
import logger from "../logger/logger";
import config from "../../config/config";

const errorHandler = (req: Request, res: Response, error, returnDetails) => {
  try {
    // !TODO: Log error to database and return error id
    const errorId = "";

    if (returnDetails) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ errorId });
    }

    if (error.statusCode) {
      res.status(error.statusCode).send(httpStatus[error.statusCode]);
    } else {
      const message = config.isDev ? error.message : httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(message);
    }
  } catch (e) {
    logger.info(e);
  } finally {
    logger.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(httpStatus[httpStatus.INTERNAL_SERVER_ERROR]);
  }
};

export default errorHandler;
