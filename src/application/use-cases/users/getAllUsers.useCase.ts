import { UserEntity, UserRepository } from "@/domain";

export class GetAllUserUseCase{
    constructor(
        private readonly repository: UserRepository
    ){}

    execute():Promise<UserEntity[]>{
        return this.repository.getAll(); 
    }
}