import { UserEntity } from "@/domain";
import { UserRepository } from "@/application/interfaces";
import { UpdateUserDto } from "@/application/dtos";

export interface IUpdateUserByIdUseCase{
    execute(updateUserDto: UpdateUserDto):Promise<UserEntity>
}

export class UpdateUserByIdUseCase implements IUpdateUserByIdUseCase{
    constructor(private readonly userRepository:UserRepository){}
    
    execute(updateUserDto: UpdateUserDto): Promise<UserEntity> {
        return this.userRepository.updateById(updateUserDto)
    }
}