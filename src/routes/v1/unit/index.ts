import express from "express";
import newUnit from "./newUnit";
import fetchUnits from "./fetchUnits";
import updateUnit from "./updateUnit";

const router = express.Router();

router.use("/new", newUnit);
router.use("/fetch", fetchUnits);
router.use("/update", updateUnit);

export default router;
