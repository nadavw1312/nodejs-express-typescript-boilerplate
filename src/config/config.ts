import "dotenv/config";
import { Type, Static } from "@sinclair/typebox";
import Ajv from "ajv";

const ajv = new Ajv();
const envVars = process.env;

enum Environment {
  Production = "production",
  Development = "development",
  Test = "test",
}

const envSchema = Type.Object({
  NODE_ENV: Type.Enum(Environment),
  PORT: Type.Number(),
  CLIENT_URL: Type.String(),
  JWT_SECRET: Type.Optional(Type.String()),
});

type Schema = Static<typeof envSchema>;

const validate = ajv.compile<Schema>(envSchema);
const valid = validate(envVars);

if (!valid) {
  throw new Error(`Config validation error: ${ajv.errorsText(validate.errors)}`);
}

const config = {
  env: envVars.NODE_ENV,
  isDev: envVars.NODE_ENV === Environment.Development,
  port: envVars.PORT,
  clientUrl: envVars.CLIENT_URL,
  jwtSecret: envVars.JWT_SECRET,
};

export default config;
