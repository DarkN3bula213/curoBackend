import { app } from "./app";
import { env } from "./env";
import { Logger as log } from "./lib/logger/logger";
import { connect as connectDB } from "./database";
import { connectRedis } from "./core/cache";

const Logger = new log(__filename);
 
function startServer() {
  app
    .listen(env.app.port, () => {
      Logger.info(`Server running on port: ${env.app.port}`);
    })
    .on("error", (e) => Logger.error(e.message));
}

connectDB(app);
connectRedis();
app.on("ready", () => {
  startServer();
}); 

