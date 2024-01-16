
import {  Request,Response,NextFunction} from "express";
import { ForbiddenError } from "../lib/api";
import { PublicRequest } from "global";
import { Logger as log } from "../lib/logger/logger";
const Logger = new log(__filename);

export default (permission: string) =>
  (req: PublicRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.apiKey)
        return next(new ForbiddenError("Key not found"));

      const exists = req.apiKey.permissions.find(
        (entry) => entry === permission
      );
      Logger.debug(exists);
      if (!exists) return next(new ForbiddenError("Permission Denied"));

      next();
    } catch (error) {
      next(error);
    }
  };