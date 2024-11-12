import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@presentation/express/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type UserCreate = z.infer<typeof UserCreateSchema>;
export const UserCreateSchema = z.object({
  // id: z.number(),
  name: z.string(),
  // email: z.string().email(),
  // age: z.number(),
  // createdAt: z.date(),
  // updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;
export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  // email: z.string().email(),
  // age: z.number(),
  // createdAt: z.date(),
  // updatedAt: z.date(),
});

// Input Validation for 'GET users/:id' endpoint
export const GetUserSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});