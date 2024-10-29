import { UserEntity } from '../../../../src/domain';
import { UserRepository } from '../../../../src/application/interfaces/interfaces&Repositories/users/user.repository';
import { GetAllUsersUseCase } from '../../../../src/application/use-cases/index';
import { CreateUserDto, UpdateUserDto } from './../../../../src/application/dtos/index';

 

describe("Get All user Use Case", () => {

    class MockUserRepository implements UserRepository {
        create(createUserDto: CreateUserDto): Promise<UserEntity> {
            throw new Error("Method not implemented.");
        }
        updateById(updateUserDto: UpdateUserDto): Promise<UserEntity> {
            throw new Error("Method not implemented.")
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
        const ExpectedResult = [{ id: "1", name: "Smith" }];

        vi.spyOn(mockUserRepository, "getAll").mockImplementation(() => Promise.resolve(ExpectedResult));

        const getAllUserUseCase = new GetAllUsersUseCase(mockUserRepository);
        const result = await getAllUserUseCase.execute();
        expect(result).toStrictEqual(ExpectedResult);
    });
}); 