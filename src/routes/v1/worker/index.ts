import express from "express";
import newWorker from "./newWoker";
const router = express.Router();

router.use("/new", newWorker);
export default router;
