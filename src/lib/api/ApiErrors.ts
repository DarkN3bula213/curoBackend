import { Response } from "express";
import { env } from "../../env";

import {
  AuthFailureResponse,
  AccessTokenErrorResponse,
  InternalErrorResponse,
  NotFoundResponse,
  BadRequestResponse,
  ForbiddenResponse,
} from "./ApiResponse";
import { Logger as log } from "../logger/logger";
import { LoggerInterface } from "types";


const Logger = new log(__filename);

export enum ErrorType {
  BAD_TOKEN = "BadTokenError",
  TOKEN_EXPIRED = "TokenExpiredError",
  TOKEN_GENERATION = "TokenGenerationError",
  INVALID_TOKEN = "InvalidTokenError",
  UNAUTHORIZED = "AuthFailureError",
  ACCESS_TOKEN = "AccessTokenError",
  INTERNAL = "InternalError",
  NOT_FOUND = "NotFoundError",
  NO_ENTRY = "NoEntryError",
  NO_DATA = "NoDataError",
  BAD_REQUEST = "BadRequestError",
  FORBIDDEN = "ForbiddenError",
}

export abstract class ApiError extends Error {
  private logger: LoggerInterface = Logger;
  constructor(
    public type: ErrorType,
    message: string,
    // logger?: LoggerInterface
  ) {
    super(message);
    this.logger = Logger;
  }
public static handle(error: ApiError, res: Response): Response {
  const logger = new log(__filename);
  logger.error(error.message);

  switch (error.type) {
    case ErrorType.BAD_TOKEN:
    case ErrorType.TOKEN_EXPIRED:
    case ErrorType.UNAUTHORIZED:
      return new AuthFailureResponse(error.message).send(res);

    case ErrorType.TOKEN_GENERATION:
    case ErrorType.INVALID_TOKEN:
    case ErrorType.ACCESS_TOKEN:
      return new AccessTokenErrorResponse(error.message).send(res);

    case ErrorType.INTERNAL:
      return new InternalErrorResponse(error.message).send(res);

    case ErrorType.NOT_FOUND:
    case ErrorType.NO_ENTRY:
    case ErrorType.NO_DATA:
      return new NotFoundResponse(error.message).send(res);

    case ErrorType.BAD_REQUEST:
      return new BadRequestResponse(error.message).send(res);

    case ErrorType.FORBIDDEN:
      break;
  }

  let message = error.message;
  if (env.isProduction) message = "Something wrong happened.";
  return new InternalErrorResponse(message).send(res);
}
}

export class AuthFailureError extends ApiError {
  constructor(message = "Invalid Credentials") {
    super(ErrorType.UNAUTHORIZED, message);
  }
}

export class InternalError extends ApiError {
  constructor(message = "Internal error") {
    super(ErrorType.INTERNAL, message);
  }
}

export class BadRequestError extends ApiError {
  constructor(message = "Bad Request") {
    super(ErrorType.BAD_REQUEST, message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Not Found") {
    super(ErrorType.NOT_FOUND, message);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = "Permission denied") {
    super(ErrorType.FORBIDDEN, message);
  }
}

export class NoEntryError extends ApiError {
  constructor(message = "Entry don't exists") {
    super(ErrorType.NO_ENTRY, message);
  }
}

export class BadTokenError extends ApiError {
  constructor(message = "Token is not valid") {
    super(ErrorType.BAD_TOKEN, message);
  }
}

export class TokenExpiredError extends ApiError {
  constructor(message = "Token is expired") {
    super(ErrorType.TOKEN_EXPIRED, message);
  }
}

export class NoDataError extends ApiError {
  constructor(message = "No data available") {
    super(ErrorType.NO_DATA, message);
  }
}

export class AccessTokenError extends ApiError {
  constructor(message = "Invalid access token") {
    super(ErrorType.ACCESS_TOKEN, message);
  }
}
