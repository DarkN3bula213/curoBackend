import express from "express";
import middleware from "./middleware/common";
import { Logger as log } from "./lib/logger/logger";
const Logger = new log(__filename);

process.on("uncaughtException", (e) => {
  Logger.error(e.message);
});
const app = express();

middleware(app);

export { app };
