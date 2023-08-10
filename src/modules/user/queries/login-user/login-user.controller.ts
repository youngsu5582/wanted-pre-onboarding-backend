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
  /**
   * 사용자 로그인 기능
   *
   * Body 를 통해 받은 loginUserProps( email , password )를 통해 User 를 검증후 , Token 을 반환한다.
   *
   * @tag user
   * @param loginUserProps
   * @returns
   */
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
