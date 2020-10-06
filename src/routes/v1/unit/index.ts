import express from "express";
import newUnit from "./newUnit";

const router = express.Router();

router.use("/new", newUnit);

export default router;
