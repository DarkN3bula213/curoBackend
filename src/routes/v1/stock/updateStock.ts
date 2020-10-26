import asyncHandler from "../../../helpers/asyncHandler";
import express from "express";
import StockRepo from "../../../database/repository/StockRepo";
import { BadRequestError } from "../../../core/ApiError";
import { SuccessMsgResponse } from "../../../core/ApiResponse";
import { ItemRepo } from "../../../database/repository/ItemRepo";
import UnitRepo from "../../../database/repository/UnitRepo";

const router = express.Router();

router.put(
  "/",
  asyncHandler(async (req, res) => {
    const { id, item_code, qty, weight, piece, noOfBags, unit_code } = req.body;

    const stock = await StockRepo.findById(id);
    if (!stock)
      throw new BadRequestError(
        "No document id or id given in request is invalid"
      );

    if (item_code) {
      const item = await ItemRepo.findByItemCode(item_code);
      if (!item) throw new BadRequestError("Invalid Item Code in Request Body");
      stock.item = item._id;
    }
    if (qty) stock.qty = qty;
    if (weight) stock.weight = weight;
    if (piece) stock.piece = piece;
    if (noOfBags) stock.noOfBags = noOfBags;
    if (unit_code) {
      const unit = await UnitRepo.findByUnitCode(unit_code);
      if (!unit) throw new BadRequestError("Invalid unit code in Request Body");
    }
    await StockRepo.update(stock);
    new SuccessMsgResponse("SucessFully Updated Stock").send(res);
  })
);

export default router;
