import express from "express";
import { Types } from "mongoose";
import { BadRequestError } from "../../../core/ApiError";
import { SuccessMsgResponse, SuccessResponse } from "../../../core/ApiResponse";
import Logger from "../../../core/Logger";
import { ManagerModel } from "../../../database/model/Manager";
import Unit from "../../../database/model/Unit";
import { ManagerRepo } from "../../../database/repository/ManagerRepo";
import UnitRepo from "../../../database/repository/UnitRepo";
import asyncHandler from "../../../helpers/asyncHandler";
import validator from "../../../helpers/validator";
import unitSchema from "./unitSchema";

const router = express.Router();

router.post(
  "/",
  validator(unitSchema.new),
  asyncHandler(async (req, res) => {
    const { name, unit_code, manager_mn, director_mn } = req.body;
    Logger.info("test");

    const exists = await UnitRepo.findByUnitCode(unit_code);
    if (exists) throw new BadRequestError("Unit already exists");

    const manager = await ManagerRepo.findByMobileNumber(manager_mn);
    if (!manager)
      throw new BadRequestError("Manager For the Unit is not valid");

    const director = await ManagerRepo.findByMobileNumber(director_mn);
    if (!director)
      throw new BadRequestError("Director For the Unit is not valid");

    const createdUnit = await UnitRepo.create({
      name,
      unit_code,
      manager: manager._id,
      director: director._id,
    } as Unit);

    new SuccessResponse("Unit Registration Successful", { createdUnit }).send(
      res
    );
  })
);

export default router;
