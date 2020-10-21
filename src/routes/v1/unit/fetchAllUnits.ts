import express from "express";
import { InternalError } from "../../../core/ApiError";
import { SuccessResponse } from "../../../core/ApiResponse";
import UnitRepo from "../../../database/repository/UnitRepo";
import asyncHandler from "../../../helpers/asyncHandler";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const allUnits = await UnitRepo.fetchAll();
    if (!allUnits) throw new InternalError("Error fetching all units");
    new SuccessResponse("All Units", {
      allUnits,
    }).send(res);
  })
);

export default router;
