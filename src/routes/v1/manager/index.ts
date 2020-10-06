import express from "express";
import newManger from "./newManager";
const router = express.Router();

router.use("/new", newManger);

export default router;
