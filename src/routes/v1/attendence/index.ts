import express from "express";
import newAttendence from "./newAttendence";
import fetchAttendenceByRange from "./fetchAttendenceByRange";

const router = express.Router();

router.use("/new", newAttendence);
router.use("/fetchAttendenceByRange", fetchAttendenceByRange);

export default router;
