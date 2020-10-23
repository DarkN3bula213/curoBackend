import asyncHandler from "../../../helpers/asyncHandler";
import express from "express";
import validator from "../../../helpers/validator";
import itemSchema from "./itemSchema";
import { ItemRepo } from "../../../database/repository/ItemRepo";
import { InternalError } from "../../../core/ApiError";
import { SuccessResponse } from "../../../core/ApiResponse";

const router = express.Router();

router.delete(
  "/byId",
  validator(itemSchema.removeById),
  asyncHandler(async (req, res) => {
    const { _id } = req.body;

    const deletedItem = await ItemRepo.removeItem(_id);
    if (!deletedItem) throw new InternalError("Error in deleting Item");

    new SuccessResponse("Deleted Item SucessFully", {
      deletedItem,
    }).send(res);
  })
);

export default router;
