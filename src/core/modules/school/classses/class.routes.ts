import validator from "../../../../lib/helpers/validator";
import { Router } from "express";
import classSchema from "./class.schema";
import * as controller from "./class.controller";


const router = Router();

router.route("/bulk").post(validator(classSchema.createBulk), controller.bulkPostClasses);
router.route("/").get(controller.getClasses);
router.route("/:id").put(validator(classSchema.update), controller.updateClass);


export default router;   