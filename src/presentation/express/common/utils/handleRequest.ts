import type { NextFunction, Request, Response } from 'express';
// import { CustomError } from '../errors/customError';

// // Higher-order function para manejar errores
// export const handleRequest = (controllerMethod: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     controllerMethod(req, res, next).catch((error) => {
//       if (error instanceof CustomError) {
//         res.status(error.statusCode).json({ error: error.message });
//       } else {
//         // grabar log
//         res.status(500).json({ error: "Internal server error - check logs" });
//       }
//     });
//   };
// };

// Higher-order function para manejar errores de funciones asíncronas
export const handleCatchErrorAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: unknown) => next(err));
  };
};
