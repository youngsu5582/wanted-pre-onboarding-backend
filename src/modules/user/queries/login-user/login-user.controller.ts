import { TypedBody, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { LoginUserProps } from "../../domain/user.types";
import { LoginUserQuery } from "./login-user-query";

@Controller('user')
export class LoginUserController {
    constructor(private readonly queryBus : QueryBus){}
    @TypedRoute.Post('login')
    async login(@TypedBody() loginUserProps : LoginUserProps){
        const query =  new LoginUserQuery(loginUserProps);
    }
}