import { Request, Response, NextFunction } from "express";
import Ajv from "ajv";
import httpStatus from "http-status";
import pick from "lodash.pick";
import { ApiError } from "../errors/api-error";

const validateRequest = (req: Request, res: Response, next: NextFunction, schema: Record<string, any>): void => {
  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema));
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const valid = validate(object);
  if (!valid) {
    const errorMessage = ajv.errorsText(validate.errors);
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }

  return next();
};

export default validateRequest;
