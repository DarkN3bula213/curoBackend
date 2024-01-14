
import { port } from "./config";
import {app} from "./app";
import { Logger as log } from "./lib/logger/logger";
import { env } from "./env";
const Logger = new log(__filename)
app
  .listen(env.app.port, () => {
    Logger.info(`server running on port : ${env.app.port}`);
  })
  .on("error", (e) => Logger.error(e.message));
  