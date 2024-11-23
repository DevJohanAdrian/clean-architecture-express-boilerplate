import { UserEntity } from '@/domain';
export class UserMapper {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static toDomain(user: any): UserEntity {
    return new UserEntity(user.id, user.name);
  }
}
