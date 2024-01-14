import { Router } from "express";
import { Request, Response } from "express";
import * as controller from "../../../core/modules/auth/users/user.controller";
import validator from "../../../lib/helpers/validator";
import userSchema from "../../../lib/schemas/user.schema";
import { role } from "../../../lib/helpers/role";
import { RoleCode } from "../../../core/modules/auth/roles/role.model";
import { Logger as log} from "../../../lib/logger/logger";
import { RoleRequest } from "global";
import { verifyToken } from "../../../middleware/verifyToken";
 const Logger = new log(__filename);
const router = Router();

router.use(role(RoleCode.LEARNER),verifyToken);
/*---------------------------------------------------------------------------*/
router.get("/", (req: RoleRequest, res: Response) =>{
    Logger.info(`${req.currentRoleCodes}`),
    res.sendStatus(200)
});

router.route("/login")
.post(validator(userSchema.login),controller.login)




router.route("/register")
    .post(validator(userSchema.userInput),controller.register)


router.route("/logout")
    .get(controller.logout)
/*---------------------------------------------------------------------------*/

export default router;

