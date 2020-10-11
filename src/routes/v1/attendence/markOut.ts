import express from "express";
import { BadRequestError } from "../../../core/ApiError";
import { SuccessMsgResponse, SuccessResponse } from "../../../core/ApiResponse";
import Logger from "../../../core/Logger";
import AttendenceRepo from "../../../database/repository/AttendenceRepo";
import WorkerRepo from "../../../database/repository/WorkerRepo";
import asyncHandler from "../../../helpers/asyncHandler";
import validator from "../../../helpers/validator";
import attendenceSchema from "./attendenceSchema";

const router = express.Router();

router.put(
  "/",
  validator(attendenceSchema.markOut),
  asyncHandler(async (req, res) => {
    const { worker_mn, year, month, day } = req.body;

    const worker = await WorkerRepo.findByMobileNumber(worker_mn);
    if (!worker) throw new BadRequestError("Worker does not exist");

    const attn = await AttendenceRepo.findByMobileNumberAndDate(
      worker._id,
      year,
      month,
      day
    );
    if (!attn) throw new BadRequestError("Attendence Log does not exists");
    if (attn.markedOut)
      throw new BadRequestError("Worker has already marked out for the day");

    const result = await AttendenceRepo.MarkOut(attn._id);
    Logger.info(JSON.stringify(result, null, 4));

    new SuccessMsgResponse(
      `Marked Out ${worker.name} Sucessfully on ${day}/${month}/${year}`
    ).send(res);
  })
);

export default router;
