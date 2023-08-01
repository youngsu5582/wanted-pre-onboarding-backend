import { BasePrismaRepository } from "@src/libs/database/base-prisma-repository";
import UserRepositoryPort from "./user.repository.port";
import { User } from "@prisma/client";
import { LoginUserProps } from "../domain/user.types";



export class UserRepository extends BasePrismaRepository implements UserRepositoryPort{
    constructor(){
        super();
    }
    public async createUser(entity: User) : Promise<boolean>{
        const user = await this.user.create({data:entity});
        if(user)
            return true;
        else
            return false;
    }
    public async login (props: LoginUserProps){
        return
    }

}