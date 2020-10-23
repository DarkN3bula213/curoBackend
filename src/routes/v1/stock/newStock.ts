import asyncHandler from "../../../helpers/asyncHandler";
import express from "express";
import StockRepo from "../../../database/repository/StockRepo";
import Stock from "../../../database/model/Stock";
import { ItemRepo } from "../../../database/repository/ItemRepo";
import { BadRequestError, InternalError } from "../../../core/ApiError";
import validator from "../../../helpers/validator";
import stockSchema from "./stockSchema";
import UnitRepo from "../../../database/repository/UnitRepo";
import { SuccessResponse } from "../../../core/ApiResponse";

const router = express.Router();

router.post(
  "/",
  validator(stockSchema.new),
  asyncHandler(async (req, res) => {
    const {
      item_code,
      qty,
      weight,
      piece,
      packingsize,
      noOfBags,
      unit_code,
    } = req.body;

    const item = await ItemRepo.findByItemCode(item_code);
    if (!item)
      throw new BadRequestError("item_code is invalid/not registered in db");

    const unit = await UnitRepo.findByUnitCode(unit_code);
    if (!unit)
      throw new BadRequestError("unit_code is invalid/not registered in db");

    const createdStock = await StockRepo.create({
      item,
      qty,
      weight,
      piece,
      packingsize,
      noOfBags,
      unit,
    } as Stock);
    if (!createdStock) throw new InternalError("Failed to create stock");

    new SuccessResponse("Stock/Opening Balance created Successfully", {
      createdStock,
    }).send(res);
  })
);

export default router;
