import { Router } from "express";
import * as controller from "./employee.controller";

const router = Router();

router.post("/", controller.register);

export default router;
