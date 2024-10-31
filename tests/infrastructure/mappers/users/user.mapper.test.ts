import { UserEntity } from "../../../../src/domain"; 
import { UserMapper } from "../../../../src/infrastructure/mappers/users/user.mapper"; 

describe('UserMapper', () => {
  it('debería convertir un objeto de usuario a UserEntity', () => {
    const user = { id: 1, name: 'Test User' };
    const userEntity = UserMapper.toDomain(user);

    // Verifica que el objeto mapeado sea una instancia de UserEntity
    expect(userEntity).toBeInstanceOf(UserEntity);
    expect(userEntity.id).toBe(user.id);
    expect(userEntity.name).toBe(user.name);
  });

  it('debería manejar un objeto de usuario con propiedades faltantes', () => {
    const user = { id: undefined, name: 'Test User' };

    const userEntity = UserMapper.toDomain(user);

    // Verifica que el objeto mapeado sea una instancia de UserEntity
    expect(userEntity).toBeInstanceOf(UserEntity);
    expect(userEntity.id).toBeUndefined();
    expect(userEntity.name).toBe(user.name);
  });
});