import express from "express";

 
import { Types } from "mongoose";

import asyncHandler from "../../lib/helpers/asyncHandler";
import authSchema from "../../lib/schemas/auth.schema";
import validator from "../../lib/helpers/validator";
import { ValidationSource } from "../../lib/constants";
import { getAccessToken, verifyToken } from "../../lib/utils/jwt";
import { get } from "lodash";
import { ProtectedRequest } from "global";
import { AccessTokenError, AuthFailureError, TokenExpiredError } from "../../lib/api";
import UserModel from "../modules/auth/users/user.model";
import { Logger as log } from "../../lib/logger/logger";
const Logger = new log(__filename);
const router = express.Router();

export default router.use(
  validator(authSchema.auth, ValidationSource.HEADER),
  asyncHandler(async (req: ProtectedRequest, res, next) => {
    res.locals.accessToken = getAccessToken(req.headers.authorization); // Express headers are auto converted to lowercase
const accessToken = res.locals.accessToken;
Logger.debug(accessToken);
    try {
      const payload = verifyToken(res.locals.accessToken, "access");

      const userId = get(payload.decoded, "user.username");

    Logger.debug(`user: ${userId}, payload: ${(payload)}`);
   

    res.locals.roles = get(payload, "roles", []);
    res.locals.username = userId
    res.locals.authorized = true;

      return next();
    } catch (e) {
      if (e instanceof TokenExpiredError) throw new AccessTokenError(e.message);
      throw e;
    }
  })
);
