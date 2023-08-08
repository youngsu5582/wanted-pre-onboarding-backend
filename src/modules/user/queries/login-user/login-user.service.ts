import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { USER_REPOSITORY } from "../../user.di-token";
import { UserRepository } from "../../database/user.repository";
import { LoginUserQuery } from "./login-user-query";
import { UserEntity } from "../../domain/user.entity";
import { UserNotExistsError, UserPasswordNotCorrectError } from "../../domain/user.errors";
import { comparePassword } from "@src/utils/compare-password";
import { Err, Ok } from "oxide.ts";
import { DBSelectError } from "@src/modules/common.errors";

@QueryHandler(LoginUserQuery)
export class LoginUserQueryHandler implements IQueryHandler{
    constructor(@Inject(USER_REPOSITORY)
        private readonly userRepository : UserRepository){}
    async execute(query: LoginUserQuery): Promise<any> {
        const record = await this.userRepository.findByEmail(query.email);
        if(!record) return Err(new UserNotExistsError());
        if(!comparePassword(query.password,record.password)) return Err(new UserPasswordNotCorrectError());
        try{
            const token = "temp";
            this.userRepository.saveRefreshToken(record.email,token);
            return Ok(token);
        }
        catch(error:any){
            throw Err(new DBSelectError(error))
        }
    }

}