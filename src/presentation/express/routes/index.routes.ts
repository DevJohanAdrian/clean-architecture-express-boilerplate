import { Router } from 'express';
import { UserRoutes } from '../controller/user/userRouter';
import { healthCheckRouter } from '../controller/healthCheck/healthCheckRouter';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/users', UserRoutes.routes);
    router.use('/health-check', healthCheckRouter);

    return router;
  }
}
