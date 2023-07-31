import { Module, Provider } from "@nestjs/common";
import { CreateUserController } from "./commands/create-user/create-user.controller";
import { CreateUserCommandHandler } from "./commands/create-user/create-user.service";
import { UserRepository } from "./database/user.repository";
import { USER_REPOSITORY } from "./user.di-token";
import { CqrsModule } from "@nestjs/cqrs";


const httpControllers = [
    CreateUserController
]
const commandHandlers : Provider[] = [
    CreateUserCommandHandler
]
const repositories : Provider[] = [
    {provide: USER_REPOSITORY , useClass:UserRepository}
]
@Module({
    imports:[CqrsModule],
    controllers: [...httpControllers],
    providers : [
        ...repositories,
        ...commandHandlers,
    ],
})
export class UserMddule{}