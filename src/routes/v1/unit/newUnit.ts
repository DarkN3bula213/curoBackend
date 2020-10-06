import express from "express";
import { Types } from "mongoose";
import { BadRequestError } from "../../../core/ApiError";
import { SuccessResponse } from "../../../core/ApiResponse";
import Unit from "../../../database/model/Unit";
import UnitRepo from "../../../database/repository/UnitRepo";
import asyncHandler from "../../../helpers/asyncHandler";
import validator from "../../../helpers/validator";
import unitSchema from "./unitSchema";

const router = express.Router();

router.post(
  "/",
  validator(unitSchema.new),
  asyncHandler(async (req, res) => {
    const { name, unit_code, manager_id, director_id } = req.body;

    const exists = await UnitRepo.findByUnitCode(unit_code);
    if (exists) throw new BadRequestError("Unit already exists");

    const createdUnit = await UnitRepo.create({
      name,
      unit_code,
      manager: new Types.ObjectId(manager_id),
      director: new Types.ObjectId(director_id),
    } as Unit);

    new SuccessResponse("Unit Registration Successful", { createdUnit }).send(
      res
    );
  })
);

export default router;
