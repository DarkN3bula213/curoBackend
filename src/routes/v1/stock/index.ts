import express from "express";
import newStock from "./newStock";
import fetchStock from "./fetchStock";
import updateStock from "./updateStock";
const router = express.Router();

router.use("/new", newStock);
router.use("/fetch", fetchStock);
router.use("/update", updateStock);

export default router;
