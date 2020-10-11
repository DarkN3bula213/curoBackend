import asyncHandler from "../../../helpers/asyncHandler";
import express from "express";
import { ManagerRepo } from "../../../database/repository/ManagerRepo";
import { AuthFailureError } from "../../../core/ApiError";
import { SuccessResponse } from "../../../core/ApiResponse";
import validator from "../../../helpers/validator";
import accessSchema from "./accessSchema";

const router = express.Router();

router.post(
  "/basic",
  validator(accessSchema.login),
  asyncHandler(async (req, res) => {
    const { manager_mn } = req.body;
    const manager = await ManagerRepo.findByMobileNumber(manager_mn);
    if (!manager)
      throw new AuthFailureError("Manager does not exist/not valid");
    new SuccessResponse("Sucessful Login", {
      manager,
    }).send(res);
  })
);

export default router;
