import type { CreateUserDto, UpdateUserDto } from '@/application/dtos';
import type { UserEntity } from '@/domain';

export abstract class UserRepository {
  abstract create(createUserDto: CreateUserDto): Promise<UserEntity>;
  abstract updateById(updateUserDto: UpdateUserDto): Promise<UserEntity>;
  abstract getAll(): Promise<Array<UserEntity>>;
  abstract getById(id: number): Promise<UserEntity>;
  abstract deleteUser(id: number): Promise<UserEntity>;
}
