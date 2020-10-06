import express from "express";
import { BadRequestError } from "../../../core/ApiError";
import { SuccessResponse } from "../../../core/ApiResponse";
import { ManagerRepo } from "../../../database/repository/ManagerRepo";
import asyncHandler from "../../../helpers/asyncHandler";

const router = express.Router();

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, shift, mobile_number, date_of_join } = req.body;

    const exists = await ManagerRepo.findByMobileNumber(mobile_number);
    if (exists) throw new BadRequestError("Manager already exists");

    const createdManager = await ManagerRepo.create(
      name,
      shift,
      mobile_number,
      date_of_join
    );

    new SuccessResponse("Manager Sucessfully Registered", {
      createdManager,
    }).send(res);
  })
);

export default router;
