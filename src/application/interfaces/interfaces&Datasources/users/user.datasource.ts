import { UserEntity } from "@/domain";
import { CreateUserDto, UpdateUserDto } from "@/application/dtos";

export abstract class UserDatasource{

    abstract create(createUserDto: CreateUserDto): Promise<UserEntity>
    abstract updateById(updateUserDto: UpdateUserDto): Promise<UserEntity>
    abstract getAll(): Promise<UserEntity[]>
    abstract getById(id: number): Promise<UserEntity>
    abstract deleteUser(id: number): Promise<UserEntity>


}   