import { Router } from "express";
import * as controller from "./payment.controller";
import validator from "../../../../lib/helpers/validator";
import paymentSchema from "./payment.schema";
const router = Router();

router.post(
  "/register",
  validator(paymentSchema.register),
  controller.registerPayment
);
router.get("/", controller.getPayments);
router.get("/:classId", controller.getPaymentsByClassId);
router.delete(
  "/:id",
  validator(paymentSchema.removePayment),
  controller.removePayment
);

export default router;
