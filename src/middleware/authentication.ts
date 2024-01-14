import express from "express";
import { ValidationSource } from "..//lib/constants";
import validator from "../lib/helpers/validator";
import authSchema from "../lib/schemas/auth.schema";
import asyncHandler from "../lib/helpers/asyncHandler";
import { ProtectedRequest } from "global";
import { getAccessToken } from "../lib/utils/jwt";
import UserModel from "..//core/modules/auth/users/user.model";
import { Types } from "mongoose";
import { AccessTokenError, AuthFailureError, TokenExpiredError } from "..//lib/api";
 import {get} from "lodash";
 import jwt from "jsonwebtoken";
import { Logger as log } from "../lib/logger/logger";
 const Logger = new log(__filename);
const router = express.Router();

export default router.use(
  // validator(authSchema.auth, ValidationSource.HEADER),
  asyncHandler(async (req: ProtectedRequest, res, next) => {
    // req.accessToken = getAccessToken(req.headers.authorization); // Express headers are auto converted to lowercase

    try {
       const token = req.cookies?.token;
      if (!token) throw new AuthFailureError("No token provided");
      const payload = jwt.verify(token, `process.env.JWT_SECRET!`);
      const userId = get(payload, "user");
      Logger.debug(`user: ${userId}`);

      const user = await UserModel.findOne(
        { _id:new Types.ObjectId(userId) },
        "+password"
      )
        .lean()
        .exec();
    

      if (!user){
        //remove cookie
        res.clearCookie('token');
        throw new AuthFailureError("User not registered")};
      req.user = user;

 
      return next();
    } catch (e) {
      if (e instanceof TokenExpiredError) throw new AccessTokenError(e.message);
      throw e;
    }
  })
);
