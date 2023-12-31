import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user-command';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../../user.di-token';
import UserRepositoryPort from '../../database/user.repository.port';
import { UserEntity } from '../../domain/user.entity';
import { Err, Ok, Result } from 'oxide.ts';
import { UserAlreadyExistsError } from '../../domain/user.errors';
import { PrismaKnownRequestCode } from '@src/libs/database/base-prisma-code';
import { hashPassword } from '@src/utils/hash-password';
import { DBInsertError } from '@src/modules/common.errors';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}
  async execute(
    command: CreateUserCommand,
  ): Promise<Result<string, UserAlreadyExistsError>> {
    const user = UserEntity.create({
      email: command.email,
      password: hashPassword(command.password),
      nickname: command.nickname,
    });
    try {
      await this.userRepository.createUser(user);
      return Ok(user.id);
    } catch (error: any) {
      /**
       * 08.02 현재는 Prisma 에 의존된 코드로 매우 지양되어야 하는 코드임 . 차후 수정 예정
       */
      if (error.code === PrismaKnownRequestCode) {
        return Err(new UserAlreadyExistsError(error));
      }
      throw Err(new DBInsertError(error));
    }
  }
}
