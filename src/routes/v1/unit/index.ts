import express from "express";
import newUnit from "./newUnit";
import fetchAllUnits from "./fetchAllUnits";

const router = express.Router();

router.use("/new", newUnit);
router.use("/fetchAll", fetchAllUnits);

export default router;
