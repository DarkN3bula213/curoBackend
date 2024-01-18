import Redis from "ioredis";
import { env } from "../../env";
import { Logger as log} from "../../lib/logger/logger";
const Logger = new log(__filename);


export default function client() {
    try {
   
     const redis = new Redis(env.redis.upstash);
        redis.on("connect", () => Logger.info("Cache is connecting"));
        redis.on("ready", () => Logger.info("Cache is ready"));
        redis.on("end", () => Logger.info("Cache disconnected"));
        redis.on("reconnecting", () => Logger.info("Cache is reconnecting"));
        redis.on("error", (e) => {
          Logger.error(e.message);
          setTimeout(client, 10000);
        });
        process.on("SIGINT", async () => {
           redis.disconnect();
        });
        return redis;
    } catch (error) {
        Logger.error(error.message);
        
    }

}

export const redisClient = client();