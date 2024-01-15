import { Router } from "express";
import { bulkPostClasses } from "../modules/school/classses/class.controller";
import validator from "../../lib/helpers/validator";
import classSchema from "../modules/school/classses/class.schema";
import  routes from "../modules/school/classses/class.routes";
import students from "../modules/school/students/student.routes";
import payments from "../modules/school/payments/payment.routes";
const router = Router();

router.use("/classes", routes);
router.use("/students", students);
router.use("/payments", payments);


export default router; 