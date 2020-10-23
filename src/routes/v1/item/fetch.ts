import asyncHandler from "../../../helpers/asyncHandler";
import express from "express";
import validator from "../../../helpers/validator";
import { ItemRepo } from "../../../database/repository/ItemRepo";
import { InternalError } from "../../../core/ApiError";
import { SuccessResponse } from "../../../core/ApiResponse";
import itemSchema from "./itemSchema";

const router = express.Router();

router.get(
  "/allItems",
  asyncHandler(async (req, res) => {
    const allItems = await ItemRepo.fetchAll();
    if (!allItems) throw new InternalError("No item fetched successfully");

    new SuccessResponse("All Items List", {
      allItems,
    }).send(res);
  })
);
2;
router.get(
  "/ByItemCode",
  validator(itemSchema.fetchByItemCode),
  asyncHandler(async (req, res) => {
    const { item_code } = req.body;
    const item = await ItemRepo.findByItemCode(item_code);
    if (!item)
      throw new InternalError("No item bu itemcode fetched successfully");

    new SuccessResponse("Item By Item Code", {
      item,
    }).send(res);
  })
);

export default router;
