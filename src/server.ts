import { app } from "./app";
import { env } from "./env";
import { Logger as log } from "./lib/logger/logger";
// import { connect as connectDB } from "./database";
 

const Logger = new log(__filename);
 

  app
    .listen(env.app.port, () => {
      Logger.info(`Server running on port: ${env.app.port}`);
    })
    .on("error", (e) => Logger.error(e.message));


// connectDB(app) 




  // startServer();


// function stopServer() {
//   app(() => {
//     Logger.info("Server stopped");
//     process.exit(0);
//   });
// }

// process.on("SIGINT", () => {
//   Logger.info("Received SIGINT signal");
//   stopServer();
// });

// process.on("SIGTERM", () => {
//   Logger.info("Received SIGTERM signal");
//   stopServer();
// });
