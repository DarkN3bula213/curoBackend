import express from "express";
import workerRoutes from "./worker";
import unitRoutes from "./unit";
import managerRoutes from "./manager";
import attendenceRoutes from "./attendence";
import accessRoutes from "./access";
import itemRoutes from "./item";
import stockRoutes from "./stock";

const router = express.Router();

router.use("/worker", workerRoutes);
router.use("/unit", unitRoutes);
router.use("/manager", managerRoutes);
router.use("/attendence", attendenceRoutes);
router.use("/access", accessRoutes);
router.use("/item", itemRoutes);
router.use("/stock", stockRoutes);

export default router;
