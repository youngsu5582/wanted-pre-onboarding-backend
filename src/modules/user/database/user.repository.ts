import { BasePrismaRepository } from "@src/libs/database/base-prisma-repository";
import { UserRepositoryPort } from "./user.repository.port";



export class UserRepository extends BasePrismaRepository implements UserRepositoryPort{
    constructor(){
        super();
    }

}