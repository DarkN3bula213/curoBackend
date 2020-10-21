import asyncHandler from "../../../helpers/asyncHandler";
import express from "express";
import UnitRepo from "../../../database/repository/UnitRepo";
import { ManagerRepo } from "../../../database/repository/ManagerRepo";
import { BadRequestError } from "../../../core/ApiError";
import { SuccessMsgResponse } from "../../../core/ApiResponse";
import validator from "../../../helpers/validator";
import unitSchema from "./unitSchema";

const router = express.Router();

router.put(
  "/",
  validator(unitSchema.update),
  asyncHandler(async (req, res) => {
    const { name, unit_code, manager_mn, director_mn } = req.body;
    const unit = await UnitRepo.findByUnitCode(unit_code);
    if (!unit) throw new BadRequestError("unit id does not exist/invalid");
    const manager = await ManagerRepo.findByMobileNumber(manager_mn);
    if (manager_mn && !manager)
      throw new BadRequestError(
        "manager mobile number does not belog to a manager or is invalid"
      );

    const director = await ManagerRepo.findByMobileNumber(director_mn, true);
    if (director && !director)
      throw new BadRequestError(
        "director mobile number does not belog to a director or is invalid"
      );

    if (name) unit.name = name;
    if (unit_code) unit.unit_code = unit_code;
    if (manager_mn) unit.manager = manager._id;
    if (director_mn) unit.director = director._id;

    await UnitRepo.updateUnit(unit);
    new SuccessMsgResponse("Sucessfully Updated Unit").send(res);
  })
);

export default router;
