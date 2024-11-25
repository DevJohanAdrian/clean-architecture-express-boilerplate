import type { UserRepository } from '@/application/interfaces';
import type { UserEntity } from '@/domain';

export interface IGetAllUsersUse {
  execute(): Promise<Array<UserEntity>>;
}

export class GetAllUsersUseCase implements IGetAllUsersUse {
  constructor(private readonly repository: UserRepository) {}

  execute(): Promise<Array<UserEntity>> {
    return this.repository.getAll();
  }
}
