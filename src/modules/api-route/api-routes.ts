import { Router } from "express";

class ApiRoutes {
  public routes: { path: string; router: Router }[] = [];
  private version = "v1";
  constructor(version) {
    this.version = version;
  }

  public addRoute(routeName, router) {
    const path = `/api/${this.version}/${routeName}`;

    if (!routeName) {
      throw new Error("Route name is empty");
    }

    if (this.routes.some((route) => route.path === path)) {
      throw new Error(`Route ${routeName} is already registered`);
    }

    this.routes.push({ path, router });
  }
}

export default ApiRoutes;
