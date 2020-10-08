import express from "express";
import { BadRequestError, NoDataError } from "../../../core/ApiError";
import { SuccessResponse } from "../../../core/ApiResponse";
import WorkerRepo from "../../../database/repository/WorkerRepo";
import asyncHandler from "../../../helpers/asyncHandler";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const workers = await WorkerRepo.getAllWorkers();
    if (!workers) throw new NoDataError("No workers registered/in db");

    new SuccessResponse("Workers", {
      workers,
    }).send(res);
  })
);

export default router;
