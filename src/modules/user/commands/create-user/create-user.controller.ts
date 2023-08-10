import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user-command';
import { CreateUserProps } from '../../domain/user.types';
import { Result, match } from 'oxide.ts';
import { UserAlreadyExistsError } from '../../domain/user.errors';

@Controller('user')
export class CreateUserController {
  constructor(private readonly commandBus: CommandBus) {}
  /**
   * 사용자 회원가입 기능
   *
   * Body 를 통해 받은 createUserProps( email , password )를 통해 User 를 만든다.
   *
   * @tag user
   * @param createUserProps
   * @returns
   */
  @TypedRoute.Post('register')
  async create(@TypedBody() createUserProps: CreateUserProps): Promise<string> {
    const command = new CreateUserCommand(createUserProps);
    const result: Result<string, UserAlreadyExistsError> =
      await this.commandBus.execute(command);
    return match(result, {
      Ok: (id: string) => id,
      Err: (error: UserAlreadyExistsError) => {
        throw error;
      },
    });
  }
}
