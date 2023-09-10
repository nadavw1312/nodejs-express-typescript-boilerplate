import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import v1MainRoutes from "./routes/v1/main-routes";

const app: Express = express();

// set security HTTP headers
app.use(helmet());

// enable cors
app.use(cors());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// v1 api routes
v1MainRoutes.routes.forEach((route) => {
  app.use(route.path, route.router);
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

export default app;
