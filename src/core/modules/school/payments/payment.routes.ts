import { Router } from "express";
import * as controller from "./payment.controller";
import validator from "../../../../lib/helpers/validator";
import paymentSchema from "./payment.schema";
import authentication from "../../../../middleware/authentication";
import authorisation from "../../../../middleware/authorisation";
import { role } from "../../../../lib/helpers/role";
import { RoleCode } from "../../auth/roles/role.model";
const router = Router();


router.use(authentication,role(RoleCode.LEARNER),authorisation)

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