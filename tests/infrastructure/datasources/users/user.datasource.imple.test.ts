import { UserDatasourceImpl } from "../../../../src/infrastructure/datasources/users/user.datasource.impl";
import {
  CreateUserDto,
  UpdateUserDto,
} from "../../../../src/application/dtos/index";
import { UserEntity } from "../../../../src/domain/index";
import { UserMapper } from '../../../../src/infrastructure/mappers/users/user.mapper';
import prisma from '../../../../src/infrastructure/database/prisma.connection';
import { CustomGeneralError } from '../../../../src/domain/customErrors/customGeneral.error';

//sin importacion default
// vi.mock("../../../../src/infrastructure/database/prisma.connection", () => ({
//   prisma: {
//     users: {
//       create: vi.fn(),
//       update: vi.fn(),
//       findMany: vi.fn(),
//       findFirst: vi.fn(),
//       delete: vi.fn(),
//     },
//   },
// }));
// con importacion default
vi.mock('../../../../src/infrastructure/database/prisma.connection', () => ({
    default: {
      users: {
        create: vi.fn(),
        update: vi.fn(),
        findMany: vi.fn(),
        findFirst: vi.fn(),
        delete: vi.fn(),
      },
    },
  }));

vi.mock("../../../../src/infrastructure/mappers/users/user.mapper", () => ({
  UserMapper: {
    toDomain: vi.fn(),
  },
}));

describe("UserDatasourceImpl", () => {
  const datasource = new UserDatasourceImpl();
  // Mock simple del DTO
  const mockCreateUserDto = { name: "Test User" } as CreateUserDto;
  const mockUpdateUserDto = { id: 1, name: "Test User" } as UpdateUserDto;
  const mockPrismaUser = { id: 1, name: "Test User" };
  const mockUserEntity = new UserEntity(1, "Test User");

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create a new user", async () => {
    //Arrenge
    prisma.users.create.mockResolvedValue(mockPrismaUser);
    UserMapper.toDomain.mockReturnValue(mockUserEntity);
    //Act
    const result = await datasource.create(mockCreateUserDto);
    //Assert
    expect(prisma.users.create).toHaveBeenCalledWith({ data: mockCreateUserDto });
    expect(UserMapper.toDomain).toHaveBeenCalledWith(mockPrismaUser);
    expect(result).toBe(mockUserEntity);
  });

  it("should update an existing user by id", async () => {
    const updateUserDto = new UpdateUserDto(1, "Updated User");
    const mockPrismaUser = { id: 1, name: "Updated User" };
    const mockUserEntity = new UserEntity(1, "Updated User");

    prisma.users.findFirst.mockResolvedValue(mockPrismaUser); // for getById check
    prisma.users.update.mockResolvedValue(mockPrismaUser);
    UserMapper.toDomain.mockReturnValue(mockUserEntity);

    const result = await datasource.updateById(updateUserDto);

    expect(prisma.users.update).toHaveBeenCalledWith({
      where: { id: updateUserDto.id },
      data: updateUserDto,
    });
    expect(UserMapper.toDomain).toHaveBeenCalledWith(mockPrismaUser);
    expect(result).toBe(mockUserEntity);
  });

  it("should retrieve all users", async () => {
    const mockPrismaUsers = [
      { id: 1, name: "User1" },
      { id: 2, name: "User2" },
    ];
    const mockUserEntities = [
      new UserEntity(1, "User1"),
      new UserEntity(2, "User2"),
    ];

    prisma.users.findMany.mockResolvedValue(mockPrismaUsers);
    UserMapper.toDomain.mockImplementation((user) =>
      mockUserEntities.find((e) => e.id === user.id)
    );

    const result = await datasource.getAll();

    expect(prisma.users.findMany).toHaveBeenCalled();
    expect(result).toEqual(mockUserEntities);
  });

  it("should retrieve a user by id", async () => {
    const mockPrismaUser = { id: 1, name: "Test User" };
    const mockUserEntity = new UserEntity(1, "Test User");

    prisma.users.findFirst.mockResolvedValue(mockPrismaUser);
    UserMapper.toDomain.mockReturnValue(mockUserEntity);

    const result = await datasource.getById(1);

    expect(prisma.users.findFirst).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(UserMapper.toDomain).toHaveBeenCalledWith(mockPrismaUser);
    expect(result).toBe(mockUserEntity);
  });

  it("should throw error if user not found by id", async () => {
    prisma.users.findFirst.mockResolvedValue(null);

    await expect(datasource.getById(1)).rejects.toThrow(
      new CustomGeneralError("User with id: 1 not found", 404)
    );
  });

  it("should delete a user by id", async () => {
    const mockPrismaUser = { id: 1, name: "Test User" };
    const mockUserEntity = new UserEntity(1, "Test User");

    prisma.users.findFirst.mockResolvedValue(mockPrismaUser); // for getById check
    prisma.users.delete.mockResolvedValue(mockPrismaUser);
    UserMapper.toDomain.mockReturnValue(mockUserEntity);

    const result = await datasource.deleteUser(1);

    expect(prisma.users.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(UserMapper.toDomain).toHaveBeenCalledWith(mockPrismaUser);
    expect(result).toBe(mockUserEntity);
  });
});
