import express from "express";
import workerRoutes from "./worker";
import unitRoutes from "./unit";
import managerRoutes from "./manager";

const router = express.Router();

router.use("/worker", workerRoutes);
router.use("/unit", unitRoutes);
router.use("/manager", managerRoutes);

export default router;
