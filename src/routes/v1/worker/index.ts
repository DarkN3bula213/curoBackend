import express from "express";
import newWorker from "./newWoker";
import getAllWorkers from "./getAllWorkers";
const router = express.Router();

router.use("/new", newWorker);
router.use("/getAll", getAllWorkers);
export default router;
