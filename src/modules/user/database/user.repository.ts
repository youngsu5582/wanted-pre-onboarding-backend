import { BasePrismaRepository } from "@src/libs/database/base-prisma-repository";
import UserRepositoryPort from "./user.repository.port";
import { CreateUserRequestDto } from "../dtos/create-user-request.dto";
import { LoginUserRequestDto } from "../dtos/login-user-request.dto";
import { User } from "@prisma/client";



export class UserRepository extends BasePrismaRepository implements UserRepositoryPort{
    constructor(){
        super();
    }
    public async createUser(user: User) {
        return await this.user.create({data:user});
    }
    public async login (dto: LoginUserRequestDto){
        return
    }

}