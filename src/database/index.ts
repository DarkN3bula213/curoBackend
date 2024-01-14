import mongoose from "mongoose";



import  {env}  from "../env";
import { Logger } from "../lib/logger/logger";
 const log = new Logger(__filename)
const { db } = env;
// Build the connection string
const dbURI= env.isDevelopment ? env.db.dev: env.db.prod;

 const dbURL = `mongodb://${db.user}:${encodeURIComponent(db.password)}@${
   db.host
 }:${db.port}/${db.name}`;
 
  export const connect = (app: { emit: (arg0: string) => void; }) => {
  
    const connectWithRetry = ( ) => {
      
      mongoose.Promise = global.Promise;
      log.info("MongoDB connection with retry");
      mongoose
        // .connect(env.mongo.uri)
        .connect(dbURL)
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