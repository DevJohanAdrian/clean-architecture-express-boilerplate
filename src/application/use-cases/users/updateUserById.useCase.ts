import type { UpdateUserDto } from '@/application/dtos';
import type { UserRepository } from '@/application/interfaces';
import type { UserEntity } from '@/domain';

export interface IUpdateUserByIdUseCase {
  execute(updateUserDto: UpdateUserDto): Promise<UserEntity>;
}

export class UpdateUserByIdUseCase implements IUpdateUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.userRepository.updateById(updateUserDto);
  }
}
