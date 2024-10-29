
import { UserEntity } from "../../../../src/domain";
import { UpdateUserByIdUseCase } from '../../../../src/application/use-cases/index';
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

    test("Should edit a user by id", async()=>{
         // Arrenge
         const data = {id:1, name:"test2"}
     
         // Act
         vi.spyOn(mockUserRepository, "updateById").mockImplementation(()=> Promise.resolve(data))
         const updateUserByIdUseCase = new UpdateUserByIdUseCase(mockUserRepository)
         const result = await updateUserByIdUseCase.execute()
         // Assert
         expect(result).toStrictEqual(data)
    })
})
