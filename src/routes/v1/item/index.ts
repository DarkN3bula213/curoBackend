import express from "express";
import newItem from "./newItem";

const router = express.Router();

router.use("/new", newItem);

export default router;
