import express from "express";
import newAttendence from "./newAttendence";
import fetchAttendenceByRange from "./fetchAttendenceByRange";
import markOut from "./markOut";
import generatePdfReport from "./generatePdfReport";

const router = express.Router();

router.use("/new", newAttendence);
router.use("/fetchAttendenceByRange", fetchAttendenceByRange);
router.use("/markOut", markOut);
router.use("/generatePdfReport", generatePdfReport);

export default router;
