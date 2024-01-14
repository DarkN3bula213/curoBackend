import { Router } from "express";
import { Request, Response } from "express";
import permissions from "../../middleware/permissions";
import { Permission } from "../modules/auth/apiKey/apiKey.model";
import validator from "../../lib/helpers/validator";
import apiKeySchema from "../../lib/schemas/apiKey.schema";
import apiKey from "../auth/apiKey";
import user from './protected/user.routes'
const router =Router()


/*---------------------------------------------------------------------------*/
router.use(apiKey)
/*---------------------------------------------------------------------------*/
router.use(permissions(Permission.GENERAL));
/*---------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------*/
  router.get("/health-check", (req: Request, res: Response) => res.sendStatus(200));
/*---------------------------------------------------------------------------*/
  
router.use("/user",user)
export default router