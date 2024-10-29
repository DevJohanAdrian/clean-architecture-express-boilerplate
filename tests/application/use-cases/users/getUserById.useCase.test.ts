
import { UserEntity } from "../../../../src/domain";
import { GetUserByIdUseCase } from '../../../../src/application/use-cases/index';
import { UserRepository } from "../../../../src/application/interfaces/index";
import { CreateUserDto, UpdateUserDto } from './../../../../src/application/dtos/index';

describe("Get user use case",()=>{
    class MockUserRepositoryImpl implements UserRepository {
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

    beforeEach(()=>{
        vi.clearAllMocks(); // Limpia los mocks antes de cada prueba
        mockUserRepository = new MockUserRepositoryImpl();
    })

    test("Should return a user by id", async()=>{
         // Arrenge
         const data = {id:1, name:"test"}
         const id = 1;
         // Act
         vi.spyOn(mockUserRepository, "getById").mockImplementation(()=> Promise.resolve(data))
         const getUserByIdUseCase = new GetUserByIdUseCase(mockUserRepository)
         const result = await getUserByIdUseCase.execute(id)
         // Assert
         expect(result).toStrictEqual(data)
    })
})
