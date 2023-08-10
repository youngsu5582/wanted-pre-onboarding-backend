import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { LoginUserProps } from '../../domain/user.types';
import { LoginUserQuery } from './login-user-query';
import {
  UserNotExistsError,
  UserPasswordNotCorrectError,
} from '../../domain/user.errors';
import { Result, match } from 'oxide.ts';

@Controller('user')
export class LoginUserController {
  constructor(private readonly queryBus: QueryBus) {}
  @TypedRoute.Post('login')
  async login(@TypedBody() loginUserProps: LoginUserProps): Promise<string> {
    const query = new LoginUserQuery(loginUserProps);
    const result: Result<
      string,
      UserNotExistsError | UserPasswordNotCorrectError
    > = await this.queryBus.execute(query);
    return match(result, {
      Ok: (accessToken: string) => accessToken,
      Err: (error: UserNotExistsError | UserPasswordNotCorrectError) => {
        throw error;
      },
    });
  }
}
