import { NextFunction, Router, Response, Request } from "express";
import { AuthenticationType, RequestMethod } from "../../types/enums";
import errorHandler from "./error-handler";
import { authHandler } from "./auth-handler";
import { ExpressHandler } from "../../types/types";
import validateRequest, { SchemaValidator } from "./validate-request";

type RequestHandlerProps = {
  router: Router;
  method: RequestMethod;
  urlPath: string;
  authType?: AuthenticationType;
  finalAction: (req: Request, res: Response, next: NextFunction) => void;
  additionalPipes?: Array<ExpressHandler>;
  requestSchema?: SchemaValidator;
};

class RequestHandler {
  createEndPoint = (props: RequestHandlerProps) => {
    const { router, method, urlPath, authType, finalAction, additionalPipes, requestSchema } = props;
    const pipes = [];

    if (requestSchema) pipes.push((...args: Parameters<ExpressHandler>) => validateRequest(...args, requestSchema));

    if (authType) pipes.push((...args: Parameters<ExpressHandler>) => authHandler(...args, authType));

    if (additionalPipes) pipes.push(...additionalPipes);

    pipes.push((req, res) => this.runFinalAction(req, res, finalAction, authType));

    if (router[method]) {
      router[method](urlPath, pipes);
    } else {
      throw new Error("Invalid request method");
    }
  };

  runFinalAction = async (req: Request, res: Response, finalAction, authType) => {
    try {
      const result = finalAction();
      if (result && result.then) {
        const response = await result;
        res.send(response);
      }

      res.send(result);

      await finalAction;
    } catch (error) {
      errorHandler(req, res, error, authType === AuthenticationType.admin);
    }
  };
}

const requestHandler = new RequestHandler();

export { requestHandler };
