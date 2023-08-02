import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { USER_REPOSITORY } from "../../user.di-token";
import { UserRepository } from "../../database/user.repository";
import { LoginUserQuery } from "./login-user-query";
import { UserEntity } from "../../domain/user.entity";

@QueryHandler(LoginUserQuery)
export class LoginUserQueryHandler implements IQueryHandler{
    constructor(@Inject(USER_REPOSITORY)
        private readonly userRepository : UserRepository){}
    async execute(query: LoginUserQuery): Promise<any> {
        const user = await this.userRepository.user.findUnique({where:{email:query.email},select:{password:true,email:true}});
        
        return 
    }

}