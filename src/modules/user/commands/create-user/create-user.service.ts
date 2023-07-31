import { CommandHandler  , ICommandHandler} from "@nestjs/cqrs";
import { CreateUserCommand } from "./create-user-command";
import { Inject } from "@nestjs/common";
import { USER_REPOSITORY } from "../../user.di-token";
import { UserRepositoryPort } from "../../database/user.repository.port";



CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler{
    constructor(){}
    execute(command: any): any {
       return; 
    }
}