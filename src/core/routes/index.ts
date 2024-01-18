import { Router } from 'express';
import { Request, Response } from 'express';
import permissions from '../../middleware/permissions';
import { Permission } from '../modules/auth/apiKey/apiKey.model';

import apiKey from '../auth/apiKey';
import user from '../modules/auth/users/user.routes';
import school from './school.routes';
import { registerRoutes } from '@lib/functions/registerRoutes';
const router = Router();

router.get('/health-check', (req: Request, res: Response) =>
  res.sendStatus(200),
);
/*---------------------------------------------------------------------------*/
router.use(apiKey);
/*---------------------------------------------------------------------------*/
router.use(permissions(Permission.GENERAL));
/*---------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------*/

const routes = [
  {
    path: '/user',
    route: user,
  },
  {
    path: '/school',
    route: school,
  },
];

registerRoutes(router, routes);
/*---------------------------------------------------------------------------*/

export default router;
