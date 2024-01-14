import mongoose from "mongoose";



import  {env}  from "../env";
import { Logger } from "../lib/logger/logger";
 const log = new Logger(__filename)
// Build the connection string
const dbURI= env.isDevelopment ? env.db.dev: env.db.prod;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  autoIndex: true,
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};
 
  export const connect = (app: { emit: (arg0: string) => void; }) => {
    const options = {
      useNewUrlParser: true,
      autoIndex: false, // Don't build indexes
      maxPoolSize: 10, // Maintain up to 10 socket connections
    };
  
    const no_of_retries = 25;
  
    const connectWithRetry = ( ) => {
      
      mongoose.Promise = global.Promise;
      log.info("MongoDB connection with retry");
      mongoose
        .connect(env.mongo.uri)
        .then(() => {
          log.info(`Connected to MongoDB: ${mongoose.connection.host}`);
          app.emit("ready");
        })
        .catch((err) => {
          log.error(
            "MongoDB connection unsuccessful, retry after 2 seconds.",
            err
          );
          setTimeout(connectWithRetry, 2000);
        }).finally(()=>{
          process.on("SIGINT", () => {
            mongoose.connection.close();
              process.exit(0);
            });
        })
    };
    connectWithRetry();
  };