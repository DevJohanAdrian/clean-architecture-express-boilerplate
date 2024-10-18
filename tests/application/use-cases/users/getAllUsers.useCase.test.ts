import { UserEntity } from '../../../../src/domain';
import { UserRepository } from '../../../../src/application/interfaces/interfaces&Repositories/users/user.repository';
import { GetAllUserUseCase } from '../../../../src/application/use-cases/users/getAllUsers.useCase';
 




describe("Get All user Use Case", () => {

    class MockUserRepository implements UserRepository {
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
        const ExpectedResult = [{ id: "1", name: "Smith" }];

        vi.spyOn(mockUserRepository, "getAll").mockImplementation(() => Promise.resolve(ExpectedResult));

        const getAllUserUseCase = new GetAllUserUseCase(mockUserRepository);
        const result = await getAllUserUseCase.execute();
        expect(result).toStrictEqual(ExpectedResult);
    });
});