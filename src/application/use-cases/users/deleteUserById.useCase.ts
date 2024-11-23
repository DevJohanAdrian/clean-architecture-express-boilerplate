import type { UserRepository } from '@/application/interfaces';
import type { UserEntity } from '@/domain';

export interface IDeleteUserByIdUseCase {
  execute(id: number): Promise<UserEntity>;
}

export class DeleteUserByIdUseCase implements IDeleteUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute(id: number): Promise<UserEntity> {
    return this.userRepository.deleteUser(id);
  }
}
