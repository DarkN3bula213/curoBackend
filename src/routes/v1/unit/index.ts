import express from "express";
import newUnit from "./newUnit";
import fetchAllUnits from "./fetchAllUnits";
import updateUnit from "./updateUnit";

const router = express.Router();

router.use("/new", newUnit);
router.use("/fetchAll", fetchAllUnits);
router.use("/update", updateUnit);

export default router;
