import express from "express";
import newManger from "./newManager";
import getInfo from "./getInfo";
import toggleIsAllowed from "./toggleIsAllowed";
import updateFcmToken from "./updateFcmToken";
const router = express.Router();

router.use("/new", newManger);
router.use("/getInfo", getInfo);
router.use("/toggleIsAllowed", toggleIsAllowed);
router.use("/updateFcmToken", updateFcmToken);

export default router;
