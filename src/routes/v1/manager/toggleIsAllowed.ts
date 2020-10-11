import asyncHandler from "../../../helpers/asyncHandler";
import express from "express";
import { ManagerRepo } from "../../../database/repository/ManagerRepo";
import { BadRequestError, InternalError } from "../../../core/ApiError";
import Logger from "../../../core/Logger";
import { SuccessMsgResponse, SuccessResponse } from "../../../core/ApiResponse";
import { send } from "process";
import validator from "../../../helpers/validator";
import managerSchema from "./managerSchema";
import triggerFcmMessage from "./triggerFcmMessage";

const router = express.Router();

router.post(
  "/",
  validator(managerSchema.toggleIsAllowed),
  asyncHandler(async (req, res, next) => {
    const { manager_mn, isAllowed } = req.body;
    const manager = await ManagerRepo.findByMobileNumber(manager_mn);
    if (!manager) throw new BadRequestError("Invalid Manager");
    if (!manager.fcm_token)
      throw new InternalError(
        `No fcm token for manager with phone number: ${manager.mobile_number} and name ${manager.name}`
      );
    try {
      await ManagerRepo.toggleIsAllowed(manager._id, isAllowed);
      await triggerFcmMessage(req, res, next, manager.fcm_token);
      new SuccessMsgResponse("Successful Toggle of isAllowed").send(res);
    } catch (err) {
      throw new InternalError(`err in toggleIsAllowed: ${err}`);
    }
  })
);

export default router;
