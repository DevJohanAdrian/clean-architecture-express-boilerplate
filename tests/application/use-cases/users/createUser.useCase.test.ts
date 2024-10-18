import { CreateUserUseCase } from './../../../../src/application/use-cases/users/createUser.useCase';
import { CreateUserDto } from './../../../../src/application/dtos/users/createUserDto';
import { UserEntity } from '../../../../src/domain';
import { UserRepository } from '../../../../src/application/interfaces/interfaces&Repositories/users/user.repository';

describe("Create Contact Use Case", () => {
    class MockUserRepository implements UserRepository {
        create(createUserDto: CreateUserDto): Promise<UserEntity> {
            throw new Error("Method not implemented.");
        }
        getAll(): Promise<UserEntity[]> {
            throw new Error("Method not implemented.");
        }
    }

    let mockUserRepository: UserRepository;

    beforeEach(() => {
        vi.clearAllMocks(); // Limpia los mocks antes de cada prueba
        mockUserRepository = new MockUserRepository();
    });

    test("should return data", async () => {
        const InputData = { id: "1", name: "Smith" }

        // vi.spyOn(mockUserRepository, "create").mockImplementation(() => Promise.resolve(true))
        vi.spyOn(mockUserRepository, "create").mockImplementation(() => Promise.resolve(InputData))
        const createUserUseCase = new CreateUserUseCase(mockUserRepository)
        const result = await createUserUseCase.execute(InputData);
        expect(result).toBe(InputData)

    });

})