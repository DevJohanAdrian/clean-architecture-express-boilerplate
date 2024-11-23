import { CreateUserUseCase } from "./../../../../src/application/use-cases/index";
import {
  CreateUserDto,
  UpdateUserDto,
} from "./../../../../src/application/dtos/index";
import { UserEntity } from "../../../../src/domain";
import { UserRepository } from "../../../../src/application/interfaces/index";

describe("Create user Use Case", () => {
  class MockUserRepository implements UserRepository {
    create(createUserDto: CreateUserDto): Promise<UserEntity> {
      throw new Error("Method not implemented.");
    }
    updateById(updateUserDto: UpdateUserDto): Promise<UserEntity> {
      throw new Error("Method not implemented.");
    }
    getAll(): Promise<UserEntity[]> {
      throw new Error("Method not implemented.");
    }
    getById(id: number): Promise<UserEntity> {
      throw new Error("Method not implemented.");
    }
    deleteUser(id: number): Promise<UserEntity> {
      throw new Error("Method not implemented.");
    }
  }

  let mockUserRepository: UserRepository;

  beforeEach(() => {
    vi.clearAllMocks(); // Limpia los mocks antes de cada prueba
    mockUserRepository = new MockUserRepository();
  });

  test("should return data", async () => {
    const InputData = { id: "1", name: "Smith" };

    // vi.spyOn(mockUserRepository, "create").mockImplementation(() => Promise.resolve(true))
    vi.spyOn(mockUserRepository, "create").mockImplementation(() =>
      Promise.resolve(InputData),
    );
    const createUserUseCase = new CreateUserUseCase(mockUserRepository);
    const result = await createUserUseCase.execute(InputData);
    expect(result).toBe(InputData);
  });
});
