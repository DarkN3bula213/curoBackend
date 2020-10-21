import asyncHandler from "../../../helpers/asyncHandler";
import express from "express";
import validator from "../../../helpers/validator";
import workerSchema from "./workerSchema";
import WorkerRepo from "../../../database/repository/WorkerRepo";
import { InternalError } from "../../../core/ApiError";
import { SuccessResponse } from "../../../core/ApiResponse";

const router = express.Router();

router.get(
  "/",
  validator(workerSchema.findAllByUnitId),
  asyncHandler(async (req, res) => {
    const { unit_id } = req.body;

    const workers = await WorkerRepo.fetchAllByUnitId(unit_id);
    if (!workers)
      throw new InternalError("Failed to retrives workers by unit id");

    new SuccessResponse("Successful Fetch of Workers", {
      workers,
    }).send(res);
  })
);

export default router;
