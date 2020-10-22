import asyncHandler from "../../../helpers/asyncHandler";
import express from "express";
import validator from "../../../helpers/validator";
import itemSchema from "./itemSchema";
import { ItemRepo } from "../../../database/repository/ItemRepo";
import Item from "../../../database/model/Item";
import { BadRequestError, InternalError } from "../../../core/ApiError";
import { SuccessResponse } from "../../../core/ApiResponse";
import { exist } from "@hapi/joi";

const router = express.Router();

router.post(
  "/",
  validator(itemSchema.new),
  asyncHandler(async (req, res) => {
    const {
      item_name,
      item_code,
      packaging_size,
      per_piece_weight,
      total_box_weight,
    } = req.body;

    const exists = await ItemRepo.findByItemCode(item_code);
    if (exists) throw new BadRequestError("Item Code already exists");

    const createdItem = await ItemRepo.create({
      item_name,
      item_code,
      packaging_size,
      per_piece_weight,
      total_box_weight,
    } as Item);
    if (!createdItem) throw new InternalError("Item creation failed");

    new SuccessResponse("Item Sucessfully created", {
      createdItem,
    }).send(res);
  })
);

export default router;
