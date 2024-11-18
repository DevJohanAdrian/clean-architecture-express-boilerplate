import { Request, Response } from "express";
import { handleCatchErrorAsync } from "@presentation/express/common/utils/handleRequest";
import { UserRepository } from "@/application/interfaces";
import { GetAllUsersUseCase, GetUserByIdUseCase, CreateUserUseCase, UpdateUserByIdUseCase, DeleteUserByIdUseCase } from "@/application/use-cases";

export class UserContoller {
  constructor(private readonly userRepository: UserRepository) {}

  public getAllUser = handleCatchErrorAsync(async (req: Request, res: Response) => {
    const users = await new GetAllUsersUseCase(this.userRepository).execute();
    res.json(users);
  })

  public getUserById = handleCatchErrorAsync(async (req:Request, res:Response)=>{
    const {id} = req.params;

    const user = await new GetUserByIdUseCase(this.userRepository).execute(parseInt(id))
    res.json(user)
  })

  public createUser = handleCatchErrorAsync(async (req:Request, res:Response)=>{


    const {body} = req;
    const user = await new CreateUserUseCase(this.userRepository).execute(body)
    res.json(user)
  })

  public updateUserById = handleCatchErrorAsync(async (req:Request, res:Response)=>{
    const {body} = req;
    const user = await new UpdateUserByIdUseCase(this.userRepository).execute(body)
    res.json(user)
  })

  public deleteUserById = handleCatchErrorAsync(async (req:Request, res:Response)=>{
    const {id} = req.params;
    const user = await new DeleteUserByIdUseCase(this.userRepository).execute(parseInt(id))
    res.json(user)
  })
}
