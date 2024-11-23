import type { UserRepository } from '@/application/interfaces';
import type { UserEntity } from '@/domain';

export interface IGetAllUsersUse {
  execute(): Promise<UserEntity[]>;
}

export class GetAllUsersUseCase implements IGetAllUsersUse {
  constructor(private readonly repository: UserRepository) {}

  execute(): Promise<UserEntity[]> {
    return this.repository.getAll();
  }
}
