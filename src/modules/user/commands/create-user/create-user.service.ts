import { CommandHandler  , ICommandHandler} from "@nestjs/cqrs";
import { CreateUserCommand } from "./create-user-command";
import { Inject } from "@nestjs/common";
import { USER_REPOSITORY } from "../../user.di-token";
import UserRepositoryPort from "../../database/user.repository.port";
import { UserEntity } from "../../domain/user.entity";
import { Err, Ok } from "oxide.ts";
import { UserAlreadyExistsError } from "../../domain/user.errors";
import { PrismaKnownRequestCode } from "@src/libs/database/base-prisma-code";
import { hashPassword } from "@src/utils/hash-password";

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler{
    constructor(
        @Inject(USER_REPOSITORY)
            private readonly userRepository : UserRepositoryPort
    ){}
    async execute(command: CreateUserCommand){
        const user = UserEntity.create({email:command.email,password:hashPassword(command.password)}); 
        try{
            await this.userRepository.createUser(user);
            return Ok(user.id);
            }
        catch(error : any){
            /**
             * 08.02 현재는 Prisma 에 의존된 코드로 매우 지양되어야 하는 코드임 . 차후 수정 예정
             */
            if(error.code ===PrismaKnownRequestCode){
                return Err(new UserAlreadyExistsError(error))
            }
            throw error;
        }
    }
}