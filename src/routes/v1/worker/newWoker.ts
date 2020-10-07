import asyncHandler from "../../../helpers/asyncHandler";
import express from "express";
import WorkerRepo from "../../../database/repository/WorkerRepo";
import { BadRequestError } from "../../../core/ApiError";
import { SuccessResponse } from "../../../core/ApiResponse";
import validator from "../../../helpers/validator";
import schema from "./workerSchema";
import Worker from "../../../database/model/Worker";
const router = express.Router();

router.post(
  "/",
  validator(schema.new),
  asyncHandler(async (req, res) => {
    const {
      unit_id,
      aadhar_number,
      name,
      shift,
      mobile_number,
      date_of_join,
    } = req.body;

    //check for valid unit id

    const exists = await WorkerRepo.findByMobileNumber(mobile_number);
    if (exists) throw new BadRequestError("Worker already exists");

    const createdWorker = await WorkerRepo.create({
      unit_id,
      aadhar_number,
      name,
      shift,
      mobile_number,
      date_of_join,
    } as Worker);

    new SuccessResponse("Sucessful Worker Registration", {
      worker: createdWorker,
    }).send(res);
  })
);

export default router;
