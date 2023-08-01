import { CommandHandler  , ICommandHandler} from "@nestjs/cqrs";
import { CreateUserCommand } from "./create-user-command";
import { Inject } from "@nestjs/common";
import { USER_REPOSITORY } from "../../user.di-token";
import UserRepositoryPort from "../../database/user.repository.port";
import { User } from "@prisma/client";
import {v4} from 'uuid';
import { UserEntity } from "../../dtos/user-entity.dto";

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler{
    constructor(
        @Inject(USER_REPOSITORY)
            private readonly userRepository : UserRepositoryPort
    ){}
    async execute(command: CreateUserCommand){
        try{
            const user : UserEntity = {
                email:command.email,
                password:command.password,
                id:v4(),
            }
            const result = await this.userRepository.createUser(user);
            return true;        
            }
        catch(err){ 
            return false;
        }
    }
}