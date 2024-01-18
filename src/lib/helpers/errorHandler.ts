import { Request, Response, NextFunction } from "express";
import { Logger as Log } from "../logger/logger";
import { env } from "../../env";
import { ApiError, ErrorType, InternalError } from "../api/ApiErrors";


const Logger = new Log(__filename);
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  //@ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
    if (err.type === ErrorType.INTERNAL)
      Logger.error(
        `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
  } else {
    Logger.error(
      `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );

    if (env.isDevelopment) {

      return res.status(500).send(err);
    }
    ApiError.handle(new InternalError(), res);
  }
};


export const errors = (
  err: Error,
  req: Request,
  res: Response,
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
  } else {
    if (env.isDevelopment) {
      Logger.error(err.message);
      return res.status(500).send(err.message);
    }
    ApiError.handle(new InternalError(), res);
  }
};
