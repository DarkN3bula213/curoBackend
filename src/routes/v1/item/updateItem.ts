import asyncHandler from "../../../helpers/asyncHandler";
import express from "express";
import validator from "../../../helpers/validator";
import itemSchema from "./itemSchema";
import { ItemRepo } from "../../../database/repository/ItemRepo";
import { InternalError } from "../../../core/ApiError";
import { SuccessMsgResponse } from "../../../core/ApiResponse";

const router = express.Router();

router.put(
  "/",
  validator(itemSchema.update),
  asyncHandler(async (req, res) => {
    const {
      item_name,
      item_code,
      packaging_size,
      per_piece_weight,
      total_box_weight,
    } = req.body;

    const item = await ItemRepo.findByItemCode(item_code);
    if (!item) throw new InternalError("Item Code does not exist");

    if (item_code) item.item_code = item_code;
    if (item_name) item.item_name = item_name;
    if (packaging_size) item.packaging_size = packaging_size;
    if (per_piece_weight) item.per_piece_weight = per_piece_weight;
    if (total_box_weight) item.total_box_weight = total_box_weight;

    try {
      await ItemRepo.update(item);
    } catch (err) {
      throw new InternalError("Unable to update Item");
    }
    new SuccessMsgResponse("Item SucessFully Updated").send(res);
  })
);

export default router;
