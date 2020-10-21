import express from "express";
import newWorker from "./newWoker";
import getAllWorkers from "./getAllWorkers";
import findAllByUnitId from "./findAllByUnitId";
import updateWorker from "./updateWorker";
const router = express.Router();

router.use("/new", newWorker);
router.use("/getAll", getAllWorkers);
router.use("/fetchAllByUnitId", findAllByUnitId);
router.use("/updateWorker", updateWorker);
export default router;
