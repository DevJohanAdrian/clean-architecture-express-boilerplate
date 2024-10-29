
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { Router } from 'express';
import { z } from "zod";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { GetUserSchema, UserCreateSchema, UserSchema } from "./userModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { UserContoller } from "./userController";
import { UserRepositoryImpl } from "@/infrastructure/repositories/users/user.repository.impl";
import { UserDatasourceImpl } from "@/infrastructure/datasources/users/user.datasource.impl";

// Swagger documentation
export const userRegistry = new OpenAPIRegistry();
userRegistry.register("User", UserSchema);
// (/) route
userRegistry.registerPath({
  method: "get",
  path: "/users",
  tags: ["User"],
  responses: createApiResponse(z.array(UserSchema), "Success"),
});
// (/:id) route
userRegistry.registerPath({
  method: "get",
  path: "/users/{id}",
  tags: ["User"],
  request: { params: GetUserSchema.shape.params },
  responses: createApiResponse(UserSchema, "Success"),   
});

//--------------------------------------------//

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new UserDatasourceImpl(); // comunicacion a bd
    const todoRepository = new UserRepositoryImpl( datasource );
    const userContoller = new UserContoller(todoRepository);


    router.get('/', userContoller.getAllUser);

    router.get('/:id', validateRequest(GetUserSchema), userContoller.getUserById)

    router.post('/', validateRequest(UserCreateSchema), userContoller.createUser)

    router.put('/', validateRequest(UserSchema), userContoller.updateUserById)

    router.delete('/:id', validateRequest(GetUserSchema), userContoller.deleteUserById)

    return router;
  }


}