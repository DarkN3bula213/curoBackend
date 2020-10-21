import asyncHandler from "../../../helpers/asyncHandler";
import express from "express";
import WorkerRepo from "../../../database/repository/WorkerRepo";
import Worker from "../../../database/model/Worker";
import { SuccessMsgResponse } from "../../../core/ApiResponse";
import Logger from "../../../core/Logger";
import { BadRequestError, InternalError } from "../../../core/ApiError";
const router = express.Router();

router.put(
  "/",
  asyncHandler(async (req, res) => {
    const {
      unit_id,
      aadhar_number,
      name,
      shift,
      mobile_number,
      date_of_join,
    } = req.body;

    const worker = await WorkerRepo.findByMobileNumber(mobile_number);
    if (!worker) throw new BadRequestError("Worker does not exist");

    try {
      unit_id ? (worker.unit_id = unit_id) : null;
      name ? (worker.name = name) : null;
      shift ? (worker.shift = shift) : null;
      date_of_join ? (worker.date_of_join = date_of_join) : null;
      aadhar_number ? (worker.aadhar_number = aadhar_number) : null;
      mobile_number ? (worker.mobile_number = mobile_number) : null;
      await WorkerRepo.updateWorker(worker);
    } catch (err) {
      Logger.info(`Worker update failed: ${err}`);
      throw new InternalError("Failed Worker Update");
    }

    new SuccessMsgResponse("Sucessfully Updated Worker").send(res);
  })
);

export default router;
