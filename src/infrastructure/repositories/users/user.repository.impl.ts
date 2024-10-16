import { UserDatasource, UserRepository } from "@/application/interfaces/index";
import { CreateUserDto, UpdateUserDto } from "@/application/dtos";
import { UserEntity } from "@/domain";

export class UserRepositoryImpl implements UserRepository {
   constructor(private readonly userDatastore: UserDatasource){}
   
   create(createUserDto:CreateUserDto):Promise<UserEntity>{
    return this.userDatastore.create(createUserDto);
   }
   updateById(updateUserDto: UpdateUserDto): Promise<UserEntity> {
       return this.userDatastore.updateById(updateUserDto);
   }
   getAll(): Promise<UserEntity[]> {
       return this.userDatastore.getAll();
   }
   getById(id: number): Promise<UserEntity> {
       return this.userDatastore.getById(id);
   }
   deleteUser(id: number): Promise<UserEntity> {
       return this.userDatastore.deleteUser(id)
   }


}
