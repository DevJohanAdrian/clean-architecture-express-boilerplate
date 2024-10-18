import { UserEntity } from "@/domain";
import { CreateUserDto } from '@/application/dtos';
import { UserRepository } from "@/application/interfaces";

export interface ICreateUserUseCase{
    execute(createUserDto: CreateUserDto): Promise<UserEntity>;
}

export class CreateUserUseCase implements ICreateUserUseCase{
    constructor(private readonly userRepository: UserRepository){}

    execute(createUserDto: CreateUserDto): Promise<UserEntity>{
        return this.userRepository.create(createUserDto);
    }
}