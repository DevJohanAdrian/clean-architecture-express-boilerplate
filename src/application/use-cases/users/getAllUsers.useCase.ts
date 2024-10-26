import { UserEntity} from "@/domain";
import { UserRepository } from "@/application/interfaces";

export interface IGetAllUsersUse{
    execute():Promise<UserEntity[]>
}

export class GetAllUsersUseCase implements IGetAllUsersUse{
    constructor(
        private readonly repository: UserRepository
    ){}

    execute():Promise<UserEntity[]>{
        return this.repository.getAll(); 
    }
}