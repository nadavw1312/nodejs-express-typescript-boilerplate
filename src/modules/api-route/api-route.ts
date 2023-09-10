import express, { Router } from "express";
import ApiRoutes from "./api-routes";

class ApiRoute {
  router: Router;

  constructor(routeName: string, apiRoutes: ApiRoutes) {
    this.router = express.Router({});
    apiRoutes.addRoute(routeName, this.router);
  }
}

export default ApiRoute;
