import { createClient } from "redis";

import { env } from "../../env";
import { Logger } from "../../lib/logger/logger";
const { redis } = env;
const log = new Logger(__filename);
// const redisURL = `redis://:${redis.password}@localhost:${redis.port}`;
const redisURL = `redis://:${redis.password}@${redis.host}:${redis.port}`;
log.debug(redisURL);
const redisUrl = `redis://localhost:6379`;



export const connectRedis = async () => {
    const redisClient = createClient({
      url: redisURL,
    });
    try {
        await redisClient.connect(); 
        log.info("Redis client connected...");
    } catch (err: any) {
        log.error(err.message);
    }finally{
        redisClient.on("connect", () => log.info("Cache is connecting"));
        redisClient.on("ready", () => log.info("Cache is ready"));
        redisClient.on("end", () => log.info("Cache disconnected"));
        redisClient.on("reconnecting", () => log.info("Cache is reconnecting"));
        redisClient.on("error", (e) => {
          log.error(e.message);
          setTimeout(connectRedis, 10000);
        });
        process.on("SIGINT", async () => {
          await redisClient.disconnect();
        });
    }
  return redisClient;
}
// const connectRedis = async () => {
//   try {
//     await redisClient.connect();
//     console.log("Redis client connected...");
//   } catch (err: any) {
//     console.log(err.message);
//     // setTimeout(connectRedis, 5000);
//   }
// };

// redisClient.on("connect", () => log.info("Cache is connecting"));
// redisClient.on("ready", () => log.info("Cache is ready"));
// redisClient.on("end", () => log.info("Cache disconnected"));
// redisClient.on("reconnecting", () => log.info("Cache is reconnecting"));
// redisClient.on("error", (e) => {
//   log.error(e.message);
//   setTimeout(connectRedis, 10000);
// });

// (async () => {
//   await redisClient.connect();
// })();

// // If the Node process ends, close the Cache connection
// process.on("SIGINT", async () => {
//   await redisClient.disconnect();
// });

// export default redisClient;


export async function connectCache(app: { emit: (arg0: string) => void; }) {
   const redisClient = createClient({
     url: redisURL,
   });
new global.Promise((resolve, reject) => {
    redisClient.on("connect", () => {
 log.info("Cache is connecting");
      resolve(log.debug("Cache is connecting"));
    });
    redisClient.on("ready", () => {
      
      resolve( log.info("Cache is ready") );
    });
    redisClient.on("end", () => {
    
      reject(  log.info("Cache disconnected"));
    });
    redisClient.on("reconnecting", () => {
    
      resolve(  log.info("Cache is reconnecting"));
    });
    redisClient.on("error", (e) => {
      log.error(e.message);
      reject();
    });
});
  // const redisClient = await connectRedis();
  app.emit("ready");
  return redisClient;
}