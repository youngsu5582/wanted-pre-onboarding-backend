import { BasePrismaRepository } from "@src/libs/database/base-prisma-repository";
import UserRepositoryPort from "./user.repository.port";
import { UserEntity } from "../domain/user.entity";



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
    public async findByEmail(email:string) {
        return await this.user.findUnique({where:{email},select:{password:true,email:true}});
    }
    public async saveRefreshToken(email:string,refreshToken:string){
        await this.user.update({where:{email},data:{refreshToken},select:null});
        return;
    }

}