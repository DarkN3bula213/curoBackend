import express from "express";

import schema from "../../lib/schemas/apiKey.schema";


import { Header, ValidationSource } from "../../lib/constants";
import inputValidator from "../../lib/helpers/validator";
import { Logger as log } from "../../lib/logger/logger";
import { ForbiddenError } from "../../lib/api/ApiErrors";
import asyncHandler from "../../lib/helpers/asyncHandler";
import { findByKey } from "../modules/auth/apiKey/apiKey.model";
import { PublicRequest } from "global";

const Logger = new log(__filename);
const router = express.Router();

export default router.use(
  inputValidator(schema.apiKey, ValidationSource.HEADER),
  asyncHandler(async (req:PublicRequest, res, next) => {
    const key = req.headers[Header.API_KEY]?.toString();
    if (!key) throw new ForbiddenError();

    const apiKey = await findByKey(key);
    Logger.info(apiKey?.permissions[0]);
    if (!apiKey) throw new ForbiddenError();

    req.apiKey = apiKey;
    return next();
  })
);
