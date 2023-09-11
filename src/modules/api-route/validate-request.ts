import { Request, Response, NextFunction } from "express";

import httpStatus from "http-status";
import * as pick from "lodash.pick";
import { ApiError } from "../errors/api-error";
import { Type } from "@sinclair/typebox";
import { ajv } from "../../utils/json-schema-validator";

export interface SchemaValidator {
  body?: typeof Type.Object;
  query?: typeof Type.Object;
  params?: typeof Type.Object;
}

const validateRequest = (req: Request, res: Response, next: NextFunction, schema: SchemaValidator): void => {
  const schemaToValidate = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(schemaToValidate));
  const validSchema = Type.Object({ ...schemaToValidate });
  const validate = ajv.compile(validSchema);
  const valid = validate(object);
  if (!valid) {
    const errorMessage = ajv.errorsText(validate.errors);
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }

  return next();
};

export default validateRequest;
