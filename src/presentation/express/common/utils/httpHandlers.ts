import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { ZodError, ZodSchema } from 'zod';

import { ServiceResponse } from '@presentation/express/common/models/serviceResponse';

export const handleServiceResponse = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  serviceResponse: ServiceResponse<any>,
  response: Response
) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse);
};

export const validateRequest = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    // Crear un objeto con las partes a validar basadas en `req`
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dataToValidate: Record<string, any> = {
      body: req.body,
      query: req.query,
      params: req.params
    };

    // Realizar la validación
    schema.safeParse(dataToValidate);
    // schema.parse({ body: req.body , query: req.query , params: req.params });
    next();
  } catch (err) {
    const errorMessage = `Invalid input: ${(err as ZodError).errors.map(e => e.message).join(', ')}`;
    const statusCode = StatusCodes.BAD_REQUEST;
    const serviceResponse = ServiceResponse.failure(errorMessage, null, statusCode);
    return handleServiceResponse(serviceResponse, res);
  }
};
