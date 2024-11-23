import { UserRepositoryImpl } from "../../../../src/infrastructure/repositories/users/user.repository.impl";
import { UserDatasource } from "../../../../src/application/interfaces/index";
import {
  CreateUserDto,
  UpdateUserDto,
} from "../../../../src/application/dtos/index";
import { UserEntity } from "../../../../src/domain/index";

describe("UserRepositoryImpl", () => {
  const mockUserDatasource = {
    create: vi.fn(),
    updateById: vi.fn(),
    getAll: vi.fn(),
    getById: vi.fn(),
    deleteUser: vi.fn(),
  } as unknown as UserDatasource;

  const userRepository = new UserRepositoryImpl(mockUserDatasource);

  // Mock simple del DTO
  const mockCreateUserDto = { name: "Test User" } as CreateUserDto;
  const mockUpdateUserDto = { id: 1, name: "Test User" } as UpdateUserDto;
  const mockUser = new UserEntity(1, "Test User");

  test("should call create method on userDatastore when create is called", async () => {
    //Arrenge
    mockUserDatasource.create.mockResolvedValue(mockUser);
    //Act
    const result = await userRepository.create(mockCreateUserDto);
    //Assert
    expect(mockUserDatasource.create).toHaveBeenCalledWith(mockCreateUserDto);
    expect(result).toBe(mockUser);
  });

  test("should call updateById method on userDatastore when updateById is called", async () => {
    //Arrenge
    mockUserDatasource.updateById.mockResolvedValue(mockUser);
    //Act
    const result = await userRepository.updateById(mockUpdateUserDto);
    //Assert
    expect(mockUserDatasource.updateById).toHaveBeenCalledWith(
      mockUpdateUserDto,
    );
    expect(result).toEqual(mockUpdateUserDto);
  });

  test("should call getAll method on userDatastore when getAll is called", async () => {
    //Arrenge
    const mockUsers = [new UserEntity(1, "User1"), new UserEntity(2, "User2")];
    mockUserDatasource.getAll.mockResolvedValue(mockUsers);
    //Act
    const result = await userRepository.getAll();
    //Assert
    expect(mockUserDatasource.getAll).toHaveBeenCalled();
    expect(result).toBe(mockUsers);
  });

  test("should call getById method on userDatastore when getById is called", async () => {
    //Arrenge
    mockUserDatasource.getById.mockResolvedValue(mockUser);
    //Act
    const result = await userRepository.getById(1);
    //Assert
    expect(mockUserDatasource.getById).toHaveBeenCalledWith(1);
    expect(result).toBe(mockUser);
  });

  test("should call deleteUser method on userDatastore when deleteUser is called", async () => {
    //Arrenge
    mockUserDatasource.deleteUser.mockResolvedValue(mockUser);
    //Act
    const result = await userRepository.deleteUser(1);
    //Assert
    expect(mockUserDatasource.deleteUser).toHaveBeenCalledWith(1);
    expect(result).toBe(mockUser);
  });
});
