import { TypedBody, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreateUserCommand } from "./create-user-command";
import { CreateUserProps } from "../../domain/user.types";


@Controller('user')
export class CreateUserController {
    constructor(private readonly commandBus : CommandBus){

    }
    @TypedRoute.Post('create')
    async create(@TypedBody() createUserProps : CreateUserProps){
        const command = new CreateUserCommand(createUserProps);
        const result = await this.commandBus.execute(command);
        return result;
    }
}