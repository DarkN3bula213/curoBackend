import asyncHandler from "../../../helpers/asyncHandler";
import express from "express";
import { ManagerRepo } from "../../../database/repository/ManagerRepo";
import { SuccessMsgResponse } from "../../../core/ApiResponse";
import { InternalError } from "../../../core/ApiError";
import validator from "../../../helpers/validator";
import managerSchema from "./managerSchema";

const router = express.Router();

router.put(
  "/",
  validator(managerSchema.updateFcmToken),
  asyncHandler(async (req, res) => {
    const { mobile_number, fcm_token } = req.body;

    try {
      await ManagerRepo.updateFcmToken(mobile_number, fcm_token);
    } catch (err) {
      throw new InternalError(`Updting fcmtoken error: ${err}`);
    }

    new SuccessMsgResponse(`Successfully updated Manager`).send(res);
  })
);

export default router;
