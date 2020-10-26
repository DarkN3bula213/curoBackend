import express from "express";
import { InternalError, NoDataError } from "../../../core/ApiError";
import { SuccessResponse } from "../../../core/ApiResponse";
import { ManagerRepo } from "../../../database/repository/ManagerRepo";
import UnitRepo from "../../../database/repository/UnitRepo";
import asyncHandler from "../../../helpers/asyncHandler";
import validator from "../../../helpers/validator";
import unitSchema from "./unitSchema";

const router = express.Router();

router.get(
  "/all",
  asyncHandler(async (req, res) => {
    const allUnits = await UnitRepo.fetchAll();
    if (!allUnits) throw new InternalError("Error fetching all units");
    new SuccessResponse("All Units", {
      allUnits,
    }).send(res);
  })
);

router.get(
  "/byId",
  validator(unitSchema.fetchById),
  asyncHandler(async (req, res) => {
    const { _id } = req.body;

    const unit = await UnitRepo.findById(_id);
    if (!unit) throw new InternalError(`Unit with id ${_id} does not exist`);
    new SuccessResponse(`Unit with id ${_id}`, {
      unit,
    }).send(res);
  })
);

router.get(
  "/byManager",
  validator(unitSchema.fetchByManager),
  asyncHandler(async (req, res) => {
    const { manager_mn } = req.body;

    const manager = await ManagerRepo.findByMobileNumber(manager_mn);
    if (!manager)
      throw new NoDataError(
        "Invalid Manger mn and manger with this mn does does not exist in db"
      );
    const allUnits = await UnitRepo.fetchByManager(manager);
    if (!allUnits) throw new InternalError("Error fetching all units");
    new SuccessResponse("All Units By Manager", {
      allUnits,
    }).send(res);
  })
);

router.get(
  "/byDirector",
  validator(unitSchema.fetchByDirector),
  asyncHandler(async (req, res) => {
    const { director_mn } = req.body;

    const director = await ManagerRepo.findByMobileNumber(director_mn, true);
    if (!director)
      throw new NoDataError(
        "Invalid Director mn or director with this mn does does not exist in db"
      );
    if (!director.name) throw new InternalError("Director name not send");

    const unit = await UnitRepo.fetchByDirector(director_mn);
    if (!unit)
      throw new InternalError(`No units with the director ${director.name}`);
    new SuccessResponse("All Units By Manager", {
      unit,
    }).send(res);
  })
);

export default router;
