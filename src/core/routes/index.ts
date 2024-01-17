import { Router } from "express";
import { Request, Response } from "express";
import permissions from "../../middleware/permissions";
import { Permission } from "../modules/auth/apiKey/apiKey.model";
import validator from "../../lib/helpers/validator";
import apiKeySchema from "../../lib/schemas/apiKey.schema";
import apiKey from "../auth/apiKey";
import user from '../modules/auth/users/user.routes'
import school from './school.routes'
const router =Router()

interface IRoute {
  path: string;
  route: Router;
}


router.get("/health-check", (req: Request, res: Response) => res.sendStatus(200));
/*---------------------------------------------------------------------------*/
router.use(apiKey)
/*---------------------------------------------------------------------------*/
router.use(permissions(Permission.GENERAL));
/*---------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------*/
const defaultIRoute: IRoute[] = [
    
]
  /*---------------------------------------------------------------------------*/

  router.use('/user', user);
router.use("/school",school)
export default router