import { Request, Response, NextFunction } from "express";
import { AuthenticationType } from "../../types/enums";
import httpStatus from "http-status";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const authHandler = (req: Request, res: Response, next: NextFunction, authType: AuthenticationType) => {
  try {
    if (authType === AuthenticationType.admin) {
    } else {
      next();
    }
  } catch (error) {
    if (error instanceof NotAuthorizedError) {
      res.status(httpStatus.UNAUTHORIZED).send(httpStatus["401_MESSAGE"]);
    } else {
      next(error);
    }
  }
};
