import express from "express";
import newAttendence from "./newAttendence";

const router = express.Router();

router.use("/new", newAttendence);

export default router;
