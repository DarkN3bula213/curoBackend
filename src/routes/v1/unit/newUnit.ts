import express from "express";
import asyncHandler from "../../../helpers/asyncHandler";

const router = express.Router();

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, unit_code, manager_id, director_id } = req.body;
  })
);

export default router;
