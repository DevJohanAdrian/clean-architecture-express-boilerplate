import type { CreateUserDto } from '@/application/dtos';
import type { UserRepository } from '@/application/interfaces';
import type { UserEntity } from '@/domain';

export interface ICreateUserUseCase {
  execute(createUserDto: CreateUserDto): Promise<UserEntity>;
}

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.create(createUserDto);
  }
}
