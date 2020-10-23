import asyncHandler from "../../../helpers/asyncHandler";
import express from "express";
import StockRepo from "../../../database/repository/StockRepo";
import {
  BadRequestError,
  InternalError,
  NoDataError,
} from "../../../core/ApiError";
import { SuccessResponse } from "../../../core/ApiResponse";
import validator from "../../../helpers/validator";
import stockSchema from "./stockSchema";
import UnitRepo from "../../../database/repository/UnitRepo";
import { toInteger } from "lodash";
import { ItemRepo } from "../../../database/repository/ItemRepo";

const router = express.Router();

router.get(
  "/all",
  asyncHandler(async (req, res) => {
    const allStock = await StockRepo.fetchAllStock();
    if (!allStock)
      throw new InternalError("No Stock was successfully retrieved from db");

    new SuccessResponse("All Stock Records", {
      allStock,
    }).send(res);
  })
);

router.get(
  "/byUnitCode",
  validator(stockSchema.fetchByUnitCode),
  asyncHandler(async (req, res) => {
    const { unit_code } = req.body;

    const unit = await UnitRepo.findByUnitCode(unit_code);
    if (!unit)
      throw new BadRequestError(
        "No such unit exists in db with that unit_code"
      );

    const stock = await StockRepo.fetchByUnit(unit);
    if (!stock) throw new NoDataError("No Stock with that unit was found");

    new SuccessResponse(`All Stock with unitcode ${unit_code}`, {
      stock,
    }).send(res);
  })
);

router.get(
  "/byItemCode",
  validator(stockSchema.fetchByItemCode),
  asyncHandler(async (req, res) => {
    const { item_code } = req.body;

    const item = await ItemRepo.findByItemCode(item_code);
    if (!item)
      throw new BadRequestError("No such item in db with that item_code");

    const stock = await StockRepo.fetchByItem(item);
    if (!stock)
      throw new NoDataError("No such stock associated with that item");

    new SuccessResponse(`All Stock with itemcode ${item_code}`, {
      stock,
    }).send(res);
  })
);

export default router;
