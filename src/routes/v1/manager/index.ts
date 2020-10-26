import express from "express";
import newManger from "./newManager";
import toggleIsAllowed from "./toggleIsAllowed";
import updateFcmToken from "./updateFcmToken";
import fetchManagers from "./fetchManagers";
const router = express.Router();

router.use("/new", newManger);
router.use("/toggleIsAllowed", toggleIsAllowed);
router.use("/updateFcmToken", updateFcmToken);
router.use("/fetch", fetchManagers);

export default router;
