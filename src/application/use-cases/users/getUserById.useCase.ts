import type { UserRepository } from '@/application/interfaces';
import type { UserEntity } from '@/domain';

export interface IGetUserByIdUseCase {
  execute(id: number): Promise<UserEntity>;
}

export class GetUserByIdUseCase implements IGetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute(id: number): Promise<UserEntity> {
    return this.userRepository.getById(id);
  }
}
