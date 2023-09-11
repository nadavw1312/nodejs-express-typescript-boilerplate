import { Request, Response, NextFunction } from "express";
import { AuthenticationType } from "../../types/enums";
import httpStatus from "http-status";
import { NotAuthorizedError } from "../errors/not-authorized-error";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const authHandler = (req: Request, res: Response, next: NextFunction, authType: AuthenticationType) => {
  try {
    // TODO - Implement authentication logic
    next();
  } catch (error) {
    if (error instanceof NotAuthorizedError) {
      res.status(httpStatus.UNAUTHORIZED).send(httpStatus["401_MESSAGE"]);
    } else {
      next(error);
    }
  }
};
