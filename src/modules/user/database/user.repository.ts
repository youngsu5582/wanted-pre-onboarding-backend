import { BasePrismaRepository } from "@src/libs/database/base-prisma-repository";
import UserRepositoryPort from "./user.repository.port";
import { LoginUserProps } from "../domain/user.types";
import { UserEntity } from "../domain/user.entity";
import { User } from "@prisma/client";



export class UserRepository extends BasePrismaRepository implements UserRepositoryPort{
    constructor(){
        super();
    }
    public async createUser(entity: UserEntity) : Promise<boolean>{
        const props = entity.getProps();
        const user = await this.user.create({data:{...props,createdAt:entity.createdAt}});
        if(user)
            return true;
        else
            return false;
    }
    public async login (props: LoginUserProps){
        return
    }

}