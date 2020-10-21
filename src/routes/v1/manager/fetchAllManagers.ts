import asyncHandler from "../../../helpers/asyncHandler";
import express from "express";
import { ManagerRepo } from "../../../database/repository/ManagerRepo";
import { InternalError } from "../../../core/ApiError";
import { SuccessResponse } from "../../../core/ApiResponse";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const managers = await ManagerRepo.fetchAll();
    if (!managers) throw new InternalError("Unable to retreive all managers");

    new SuccessResponse("All Managers", {
      managers,
    }).send(res);
  })
);

export default router;
