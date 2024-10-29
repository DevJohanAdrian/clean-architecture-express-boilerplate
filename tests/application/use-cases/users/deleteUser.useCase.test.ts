import { DeleteUserByIdUseCase } from '../../../../src/application/use-cases/index';
import { UserRepository } from '../../../../src/application/interfaces/index';
import { CreateUserDto, UpdateUserDto } from './../../../../src/application/dtos/index';
import { UserEntity } from '../../../../src/domain';

describe('Delete user Use case', ()=>{
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

    test('should delete data', async()=>{
        // Arrenge
        const data = {id:1, name:"test"}
        const id = 1;
        // Act
        vi.spyOn(mockUserRepository, "deleteUser").mockImplementation(()=> Promise.resolve(data))
        const deleteUserByIdUseCase = new DeleteUserByIdUseCase(mockUserRepository)
        const result = await deleteUserByIdUseCase.execute(id)
        // Assert
        expect(result).toStrictEqual(data)

    }) 


})