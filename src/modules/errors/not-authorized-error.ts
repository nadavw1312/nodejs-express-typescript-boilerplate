import { ApiError } from "./api-error";
import httpStatus from "http-status";

class NotAuthorizedError extends ApiError {
  constructor(statusCode = httpStatus.UNAUTHORIZED, isOperational = true) {
    super(statusCode, httpStatus["401_MESSAGE"], isOperational);
  }
}

export { NotAuthorizedError };
