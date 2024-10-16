import { UserEntity } from "@/domain";
export class UserMapper {
    static toDomain(user: any): UserEntity {
      return new UserEntity(
        user.id,
        user.name,
      );
    }
}