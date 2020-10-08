import express from "express";
import { BadRequestError } from "../../../core/ApiError";
import { SuccessResponse } from "../../../core/ApiResponse";
import AttendenceRepo from "../../../database/repository/AttendenceRepo";
import asyncHandler from "../../../helpers/asyncHandler";
import validator from "../../../helpers/validator";
import attendenceSchema from "./attendenceSchema";

const router = express.Router();

router.get(
  "/",
  validator(attendenceSchema.getAttendenceByRange),
  asyncHandler(async (req, res) => {
    const { startDate, endDate } = req.body;

    if (startDate > endDate)
      throw new BadRequestError("Start Date is larger than End Date in range");

    const logs = await AttendenceRepo.fetchAttendenceByDateRange(
      startDate,
      endDate
    );
    if (!logs || logs.length === 0)
      throw new BadRequestError("No Attendence Logs within this range");

    new SuccessResponse("Attendence Log", {
      logs,
    }).send(res);
  })
);

export default router;
