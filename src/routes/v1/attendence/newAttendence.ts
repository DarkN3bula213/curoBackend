import asyncHandler from "../../../helpers/asyncHandler";
import express from "express";
import { BadRequestError } from "../../../core/ApiError";
import WorkerRepo from "../../../database/repository/WorkerRepo";
import AttendenceRepo from "../../../database/repository/AttendenceRepo";
import Attendence from "../../../database/model/Attendence";
import { SuccessResponse } from "../../../core/ApiResponse";
import validator from "../../../helpers/validator";
import attendenceSchema from "./attendenceSchema";
const router = express.Router();

router.post(
  "/",
  validator(attendenceSchema.new),
  asyncHandler(async (req, res) => {
    const { worker_mn, year, month, day } = req.body;

    const now = new Date();

    const worker = await WorkerRepo.findByMobileNumber(worker_mn);
    if (!worker) throw new BadRequestError("Worker does not exist");

    const exists = await AttendenceRepo.findByMobileNumberAndDate(
      worker._id,
      year,
      month,
      day
    );
    if (exists) throw new BadRequestError("Attendence Log Already exists");

    const record = await AttendenceRepo.create({
      worker,
      inTime: now,
      year,
      month,
      day,
    } as Attendence);

    new SuccessResponse("Attendence Logged Successfully", {
      record,
    }).send(res);
  })
);

export default router;
