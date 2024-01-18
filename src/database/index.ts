import mongoose from "mongoose";

import { env } from "../env";
import { Logger as log} from "../lib/logger/logger";
const Logger = new log(__filename);
const { db } = env;
// Build the connection string
 //blogs-db-user:changeit
const dbURI = `mongodb://${db.user}:${encodeURIComponent(db.password)}@${
  db.host
}:${db.port}/${db.name}`;


Logger.debug(dbURI);

// export const connect = (app: { emit: (arg0: string) => void }) => {
//   const connectWithRetry = () => {
//     mongoose.Promise = global.Promise;
//     mongoose
//       // .connect(env.mongo.uri)
//       .connect(dbURL)
//       .then(() => {
//         log.info(`Connected to MongoDB: ${mongoose.connection.host}`);
//         app.emit("ready");
//       })
//       .catch((err) => {
//         log.error(
//           "MongoDB connection unsuccessful, retry after 2 seconds.",
//           err
//         );
//         setTimeout(connectWithRetry, 2000);
//       })
//       .finally(() => {
//         process.on("SIGINT", () => {
//           log.warn("Received SIGINT signal");
//           mongoose.connection.close();
//           process.exit(0);
//         });
//       }); //db.auth("admin", "changeit")
//   };
//   connectWithRetry();
// };
//mongodb://blogs-db-user:changeit@mongo:27017/blogs-db


mongoose.set("strictQuery", true);

function setRunValidators() {
  this.setOptions({ runValidators: true });
}
// Create the database connection
mongoose
  .plugin((schema: any) => {
    schema.pre("findOneAndUpdate", setRunValidators);
    schema.pre("updateMany", setRunValidators);
    schema.pre("updateOne", setRunValidators);
    schema.pre("update", setRunValidators);
  })
  .connect(env.mongo.uri, )
  .then(() => {
    Logger.info("Mongoose connection done");
  })
  .catch((e) => {
    Logger.info("Mongoose connection error");
    Logger.error(e);
  });

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", () => {
  Logger.debug("Mongoose default connection open to " + dbURI);
});

// If the connection throws an error
mongoose.connection.on("error", (err) => {
  Logger.error("Mongoose default connection error: " + err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  Logger.info("Mongoose default connection disconnected");
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => {
  Logger.info(
    "Mongoose default connection disconnected through app termination"
  );
  mongoose.connection.close();
  process.exit(0);
});

export const connection = mongoose.connection;

