
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { Router } from 'express';
import { z } from "zod";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { GetUserSchema, UserSchema } from "./userModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { UserContoller } from "./userController";
import { UserRepositoryImpl } from "@/infrastructure/repositories/users/user.repository.impl";
import { UserDatasourceImpl } from "@/infrastructure/datasources/users/user.datasource.impl";

export const userRegistry = new OpenAPIRegistry();
export class UserRoutes {


  static get routes(): Router {

   
    const router = Router();

    const datasource = new UserDatasourceImpl(); // comunicacion a bd
    const todoRepository = new UserRepositoryImpl( datasource );
    const userContoller = new UserContoller(todoRepository);


    userRegistry.register("User", UserSchema);

    userRegistry.registerPath({
      method: "get",
      path: "/users",
      tags: ["User"],
      responses: createApiResponse(z.array(UserSchema), "Success"),
    });
    
    router.get("/", userContoller.getAllUser);

    // userRegistry.registerPath({
    //   method: "get",
    //   path: "/users/{id}",
    //   tags: ["User"],
    //   request: { params: GetUserSchema.shape.params },
    //   responses: createApiResponse(UserSchema, "Success"),
    // });
    
    // router.get("/:id", validateRequest(GetUserSchema), userContoller.getUser);
    

 


    return router;
  }


}