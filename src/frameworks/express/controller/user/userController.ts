import { Request, Response } from "express";

import { UserRepository } from "@/domain";
import { GetAllUserUseCase } from "@/application/use-cases";

export class UserContoller {
  constructor(private readonly userRepository: UserRepository) {}

  private handleError = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    }

    // grabar log
    res.status(500).json({ error: "Internal server error - check logs" });
  };

  public getAllUser = (req: Request, res: Response) => {
    new GetAllUserUseCase(this.userRepository)
      .execute()
      .then((users) => res.json(users))
      .catch((error) => this.handleError(res, error));
  };
}
