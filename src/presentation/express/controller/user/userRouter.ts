import { UserDatasourceImpl } from '@/infrastructure/datasources/users/user.datasource.impl';
import { UserRepositoryImpl } from '@/infrastructure/repositories/users/user.repository.impl';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '@presentation/express/api-docs/openAPIResponseBuilders';
import { validateRequest } from '@presentation/express/common/utils/httpHandlers';
import { Router } from 'express';
import { z } from 'zod';
import { UserContoller } from './userController';
import { GetUserSchema, UserCreateSchema, UserSchema } from './userModel';

// Swagger documentation
export const userRegistry = new OpenAPIRegistry();
userRegistry.register('User', UserSchema);
// (/) route
userRegistry.registerPath({
  method: 'get',
  path: '/users',
  tags: ['User'],
  responses: createApiResponse(z.array(UserSchema), 'Success'),
});
// (/:id) route
userRegistry.registerPath({
  method: 'get',
  path: '/users/{id}',
  tags: ['User'],
  request: { params: GetUserSchema.shape.params },
  responses: createApiResponse(UserSchema, 'Success'),
});

//--------------------------------------------//
// biome-ignore lint/class-with-only-static-members: La clase se usa para organizar las rutas
export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new UserDatasourceImpl(); // comunicacion a bd
    const todoRepository = new UserRepositoryImpl(datasource);
    const userContoller = new UserContoller(todoRepository);

    router.get('/', userContoller.getAllUser);

    router.get(
      '/:id',
      validateRequest(GetUserSchema),
      userContoller.getUserById
    );

    router.post(
      '/',
      validateRequest(UserCreateSchema),
      userContoller.createUser
    );

    router.put('/', validateRequest(UserSchema), userContoller.updateUserById);

    router.delete(
      '/:id',
      validateRequest(GetUserSchema),
      userContoller.deleteUserById
    );

    return router;
  }
}
