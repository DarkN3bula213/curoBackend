import validator from "../../../../lib/helpers/validator";
import { Router } from "express";

import * as controller from "./student.controller";
import studentSchema from "./student.schema";


const router = Router();

router
  .route("/bulk")
  .post(controller.bulkPost);
  router.route("/").get(controller.getStudents);

router.route("/className").get(controller.getStudentsByClassName);
router.route("/cs").get(controller.getByClassSection);
 router.route("/get").get( controller.getPaginatedStudents);
router.route("/id/:id").get(  controller.getStudentsById);
router.route("/").post(validator(studentSchema.newStudent), controller.createStudent);
router.route("/fixClassIds").get(controller.fixStudentClassIds);

export default router;
