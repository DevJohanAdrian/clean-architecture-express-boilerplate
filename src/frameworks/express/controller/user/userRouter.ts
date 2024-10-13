
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { Router } from 'express';
import { z } from "zod";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { GetUserSchema, UserSchema } from "@/api/user/userModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { UserContoller } from "./userController";
import { TodoDatasourceImpl } from '../../infrastructure/datasource/todo.datasource.impl';
import { TodoRepositoryImpl } from '../../infrastructure/repositories/todo.repository.impl';


export class UserRoutes {


  static get routes(): Router {

    const userRegistry = new OpenAPIRegistry();
    const router = Router();

    const datasource = new TodoDatasourceImpl();
    const todoRepository = new TodoRepositoryImpl( datasource );
    const userContoller = new UserContoller(todoRepository);


    userRegistry.register("User", UserSchema);

    userRegistry.registerPath({
      method: "get",
      path: "/users",
      tags: ["User"],
      responses: createApiResponse(z.array(UserSchema), "Success"),
    });
    
    router.get("/", userContoller.getUsers);

    userRegistry.registerPath({
      method: "get",
      path: "/users/{id}",
      tags: ["User"],
      request: { params: GetUserSchema.shape.params },
      responses: createApiResponse(UserSchema, "Success"),
    });
    
    router.get("/:id", validateRequest(GetUserSchema), userContoller.getUser);
    

 


    return router;
  }


}