import { Router } from 'express';

interface IRoute {
  path: string;
  route: Router;
}

export function registerRoutes(router: Router, routes: IRoute[]): void {
  routes.forEach((route) => {
    router.use(route.path, route.route);
  });
}
