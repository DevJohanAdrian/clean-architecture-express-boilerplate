import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
// import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { GetUserSchema, UserSchema } from "@/api/user/userModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { userController } from "./userController";

// export const userRegistry = new OpenAPIRegistry();
// export const userRoutes: Router = express.Router();

userRegistry.register("User", UserSchema);

userRegistry.registerPath({
  method: "get",
  path: "/users",
  tags: ["User"],
  responses: createApiResponse(z.array(UserSchema), "Success"),
});

userRoutes.get("/", userController.getUsers);

userRegistry.registerPath({
  method: "get",
  path: "/users/{id}",
  tags: ["User"],
  request: { params: GetUserSchema.shape.params },
  responses: createApiResponse(UserSchema, "Success"),
});

userRoutes.get("/:id", validateRequest(GetUserSchema), userController.getUser);



import { Router } from 'express';
import { TodosController } from './controller';
import { TodoDatasourceImpl } from '../../infrastructure/datasource/todo.datasource.impl';
import { TodoRepositoryImpl } from '../../infrastructure/repositories/todo.repository.impl';


export class UserRoutes {


  static get routes(): Router {

    const userRegistry = new OpenAPIRegistry();
    const router = Router();

    const datasource = new TodoDatasourceImpl();
    const todoRepository = new TodoRepositoryImpl( datasource );
    const todoController = new TodosController(todoRepository);

    router.get('/', todoController.getTodos );
    router.get('/:id', todoController.getTodoById );
    
    router.post('/', todoController.createTodo );
    router.put('/:id', todoController.updateTodo );
    router.delete('/:id', todoController.deleteTodo );


    return router;
  }


}