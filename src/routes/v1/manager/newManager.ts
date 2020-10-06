import express from "express";
import { BadRequestError } from "../../../core/ApiError";
import { SuccessResponse } from "../../../core/ApiResponse";
import Manager from "../../../database/model/Manager";
import { RoleCode } from "../../../database/model/Role";
import { ManagerRepo } from "../../../database/repository/ManagerRepo";
import asyncHandler from "../../../helpers/asyncHandler";
import validator from "../../../helpers/validator";
import managerSchema from "./managerSchema";

const router = express.Router();

router.post(
  "/",
  validator(managerSchema.new),
  asyncHandler(async (req, res) => {
    const { name, shift, mobile_number, date_of_join, extraRoles } = req.body;

    const exists = await ManagerRepo.findByMobileNumber(mobile_number);
    if (exists) throw new BadRequestError("Manager already exists");
    if (extraRoles) extraRoles.push(RoleCode.MANAGER);
    const createdManager = await ManagerRepo.create(
      { name, shift, mobile_number, date_of_join } as Manager,
      extraRoles ? extraRoles : [RoleCode.MANAGER]
    );

    new SuccessResponse("Manager Sucessfully Registered", {
      createdManager,
    }).send(res);
  })
);

export default router;
