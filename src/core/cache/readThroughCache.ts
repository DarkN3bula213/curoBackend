import { InternalError } from "../../lib/api";
import { Logger  as log} from "../../lib/logger/logger";
import {redisClient} from "./upstash";
import { Request, Response, NextFunction } from "express";
const Logger = new log(__filename);



export const readThroughCache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cacheData = await redisClient.get(req.originalUrl);
    if (cacheData) {
      Logger.info(`Cache hit for key ${req.originalUrl}`);
      res.send(JSON.parse(cacheData)); // If cache data exists, send it and terminate the request
    } else {
      next();
        if ((res as any).data) {
          // If data is set in the response object (this assumes the routes set data they send in `res.data`)
          await redisClient.set(req.originalUrl, JSON.stringify((res as any).data), "EX", TTL);
          Logger.info(`Cache set for key ${req.originalUrl}`);

        }
    }
  } catch (error) {
    next(new InternalError("Error reading from cache"));
  }
};


export async function getFromCache(key: string) {
  try {
    const data = await redisClient.get(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.log(error);
  }
    
}


export async function setToCache(key: string, data: any) {
  try {
    const dataString = JSON.stringify(data);
    await redisClient.set(key, dataString);
  } catch (error) {
    Logger.error(error);
  }
}


export const invalidateCache = async (key:string , callback:(err:Error,result:any)=>void) => {
  redisClient.del(key, (err, result) => {
    if (err) {
      console.error(`Error invalidating cache for key ${key}: ${err}`);
    } else {
      if (result > 0) {
        Logger.info(`Cache for key ${key} found and cleared.`);
      } else {
        Logger.info(`No cache found for key ${key}.`);
      }
    }

    // Call the provided callback, if any
    if (callback) {
      callback(err, result);
    }
  });
};

const TTL = 60 * 60 * 30; // 1 month in seconds
export const readFromCache = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const cacheData = await redisClient.get(req.originalUrl);
    if (cacheData) {
      res.send(JSON.parse(cacheData)); // If cache data exists, send it and terminate the request
    } else {
      next(); // Proceed to the next middleware or route handler
    }
  } catch (error) {
    next(new InternalError("Error reading from cache"));
  }
};

export const writeToCache = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const originalSend = res.send.bind(res);
    res.send = (body: any): Response<any, Record<string, any>> => {
      redisClient.set(req.originalUrl, JSON.stringify(body), "EX", TTL);
      return originalSend(body);
    };
    next();
  } catch (error) {
    next(new InternalError("Error writing to cache"));
  }
};



export const readThrough = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const key = req.originalUrl;

  redisClient.get(key, (err, data) => {
    if (err) {
      console.error(`Error getting cache for key ${key}:`, err);
      return next(err);
    }

    if (data !== null) {
      console.log(`Cache hit for key ${key}`);
      return res.send(JSON.parse(data));
    } else {
      console.log(`Cache miss for key ${key}`);

      const originalSend = res.send.bind(res);
      res.send = (body: any): Response => {
        redisClient.set(key, JSON.stringify(body), (err) => {
          if (err) {
            console.error(`Error setting cache for key ${key}:`, err);
          } else {
            console.log(`Cache set for key ${key}`);
          }
        });
        return originalSend(body);
      };
      next();
    }
  });
};