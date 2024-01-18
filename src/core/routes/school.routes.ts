import { Router } from 'express';
import routes from '../modules/school/classses/class.routes';
import students from '../modules/school/students/student.routes';
import payments from '../modules/school/payments/payment.routes';
import { registerRoutes } from '@lib/functions/registerRoutes';
const router = Router();

// router.use("/classes", routes);
// router.use("/students", students);
// router.use("/payments", payments);

const route = [
  {
    path: '/classes',
    route: routes,
  },
  {
    path: '/students',
    route: students,
  },
  {
    path: '/payments',
    route: payments,
  },
];

registerRoutes(router, route);

export default router;
