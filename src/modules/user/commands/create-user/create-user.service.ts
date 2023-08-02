import { CommandHandler  , ICommandHandler} from "@nestjs/cqrs";
import { CreateUserCommand } from "./create-user-command";
import { Inject } from "@nestjs/common";
import { USER_REPOSITORY } from "../../user.di-token";
import UserRepositoryPort from "../../database/user.repository.port";
import { randomId } from "@src/utils/random-id";
import { UserEntity } from "../../domain/user.entity";
import { User } from "@prisma/client";
import { Ok } from "oxide.ts";

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler{
    constructor(
        @Inject(USER_REPOSITORY)
            private readonly userRepository : UserRepositoryPort
    ){}
    async execute(command: CreateUserCommand){
        const user = UserEntity.create({email:command.email,password:command.password}); 
        try{
            await this.userRepository.createUser(user);
            return Ok(user.id);
            }
        catch(err){
            return false;
        }
    }
}