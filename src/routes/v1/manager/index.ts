import express from "express";
import newManger from "./newManager";
import getInfo from "./getInfo";
const router = express.Router();

router.use("/new", newManger);
router.use("/getInfo", getInfo);

export default router;
