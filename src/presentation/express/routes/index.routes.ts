import { Router } from 'express';
import { UserRoutes } from '../controller/user/userRouter';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/users', UserRoutes.routes);

    return router;
  }
}
