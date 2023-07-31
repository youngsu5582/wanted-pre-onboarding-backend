import { TypedBody, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreateUserRequestDto } from "../../dtos/create-user-request.dto";
import { CreateUserCommand } from "./create-user-command";


@Controller('user')
export class CreateUserController {
    constructor(private readonly commandBus : CommandBus){

    }
    @TypedRoute.Post('create')
    async create(@TypedBody() createUserRequestDto : CreateUserRequestDto){
        const command = new CreateUserCommand(createUserRequestDto);
        const result = await this.commandBus.execute(command);
        return result;
    }
}