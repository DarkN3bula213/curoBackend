import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {get as _get} from "lodash";
import { Logger as log} from "../lib/logger/logger";
const Logger = new log(__filename);
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
Logger.info(`token: ${JSON.stringify(token)}`);
const decode = jwt.verify(token, `process.env.JWT_SECRET!`);
const user = _get(decode, "user");
const roles = _get(decode, "roles");
Logger.debug(`user: ${user} roles: ${roles}`);
    next();
  } catch (error) {
    // res.status(401).send("Unauthorized: Invalid token");
    Logger.error(error);
     next();
  }
};

// Example of a protected route
 
