import { Router } from 'express';
import { Response } from 'express';
import * as controller from './user.controller';
import userSchema from './user.schema';
import { RoleCode } from '..//roles/role.model';
import { Logger as log } from '../../../../lib/logger/logger';
import { RoleRequest } from 'global';
import { role } from '../../../../lib/helpers/role';
import validator from '../../../../lib/helpers/validator';
import disectToken from '../../../../core/auth/disect-token';
import { allowed } from '../../../../middleware/protect';
import authentication from 'src/middleware/authentication';

const Logger = new log(__filename);
const router = Router();

router.route('/login').post(validator(userSchema.login), controller.login);
router.use(role(RoleCode.LEARNER));
/*---------------------------------------------------------------------------*/
router.get('/', (req: RoleRequest, res: Response) => {
  Logger.info(`${req.currentRoleCodes}`), res.sendStatus(200);
});
/*---------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------*/
router
.route('/register')
.post(validator(userSchema.userInput), controller.register);
/*---------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------*/
router
.route('/register-admin')
  .post(
  authentication,
  allowed(RoleCode.ADMIN),
  validator(userSchema.roleInput),
  controller.registerUserWithRole,
  );
  /*---------------------------------------------------------------------------*/

router.route('/logout').get(controller.logout);

// router.use(authentication, authorisation);

router.route('/get').get(controller.getUsers);

router.route('/req-user').get( disectToken, controller.reqUser);
/*---------------------------------------------------------------------------*/

export default router;
