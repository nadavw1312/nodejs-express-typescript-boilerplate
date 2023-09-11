import * as winston from "winston";
import config from "../config/config";

interface LoggingInfo {
  level: string;
  message: string;
}

const enumerateErrorFormat = winston.format((info: LoggingInfo) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: config.env === "development" ? "debug" : "info",
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === "development" ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.timestamp(),
    winston.format.splat(),
    winston.format.printf((info: LoggingInfo) => `${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ["error"],
    }),
    new winston.transports.File({ filename: "logs/error/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/activity/activity.log", level: "info" }),
  ],
});

export default logger;
