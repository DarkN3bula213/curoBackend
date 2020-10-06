import express from "express";
import { BadRequestError } from "../../../core/ApiError";
import { SuccessResponse } from "../../../core/ApiResponse";
import { ManagerRepo } from "../../../database/repository/ManagerRepo";
import asyncHandler from "../../../helpers/asyncHandler";
import validator from "../../../helpers/validator";
import managerSchema from "./managerSchema";

const router = express.Router();

router.get(
  "/",
  validator(managerSchema.getInfo),
  asyncHandler(async (req, res) => {
    const { mobile_number } = req.body;

    const Manager = await ManagerRepo.findByMobileNumber(mobile_number);
    if (!Manager) throw new BadRequestError("Manager doesn't exist");

    new SuccessResponse("Manager Info", {
      Manager,
    }).send(res);
  })
);

export default router;
