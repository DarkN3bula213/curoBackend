import { Router } from "express";
import { Request, Response } from "express";
import * as controller from "./user.controller";

import userSchema from "../../../../lib/schemas/user.schema";

import { RoleCode } from "..//roles/role.model";
import { Logger as log } from "../../../../lib/logger/logger";
import { RoleRequest } from "global";
import { verifyToken } from "../../../../middleware/verifyToken";
import { role } from "../../../../lib/helpers/role";
import validator from "../../../../lib/helpers/validator";
import authentication from "../../../../middleware/authentication";
import authorisation from "../../../../middleware/authorisation";
import disectToken from "../../../../core/auth/disect-token";
 
const Logger = new log(__filename);
const router = Router();

router.use(role(RoleCode.LEARNER));
/*---------------------------------------------------------------------------*/
router.get("/", (req: RoleRequest, res: Response) => {
  Logger.info(`${req.currentRoleCodes}`), res.sendStatus(200);
});

router.route("/login").post(validator(userSchema.login), controller.login);

router
  .route("/register")
  .post(validator(userSchema.userInput), controller.register);

router.route("/logout").get(controller.logout);

// router.use(authentication, authorisation);

router.route("/get").get(controller.getUsers);

router.route("/req-user").get(disectToken,controller.reqUser);
/*---------------------------------------------------------------------------*/

export default router;
