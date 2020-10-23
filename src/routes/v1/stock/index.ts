import express from "express";
import newStock from "./newStock";
import fetchStock from "./fetchStock";

const router = express.Router();

router.use("/new", newStock);
router.use("/fetch", fetchStock);

export default router;
