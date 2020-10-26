import asyncHandler from "../../../helpers/asyncHandler";
import express from "express";
import { ManagerRepo } from "../../../database/repository/ManagerRepo";
import { BadRequestError, InternalError } from "../../../core/ApiError";
import { SuccessResponse } from "../../../core/ApiResponse";
import validator from "../../../helpers/validator";
import managerSchema from "./managerSchema";

const router = express.Router();

router.get(
  "/all",
  asyncHandler(async (req, res) => {
    const managers = await ManagerRepo.fetchAll();
    if (!managers) throw new InternalError("Unable to retreive all managers");

    new SuccessResponse("All Managers", {
      managers,
    }).send(res);
  })
);

router.get(
  "/byMobileNumber",
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
