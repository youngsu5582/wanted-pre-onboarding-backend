import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { USER_REPOSITORY } from '../../user.di-token';
import { UserRepository } from '../../database/user.repository';
import { LoginUserQuery } from './login-user-query';
import {
  UserNotExistsError,
  UserPasswordNotCorrectError,
} from '../../domain/user.errors';
import { comparePassword } from '@src/utils/compare-password';
import { Err, Ok, Result } from 'oxide.ts';
import { DBSelectError } from '@src/modules/common.errors';
import { JwtPayloadType, JwtProvider } from '@src/providers/jwt.provider';

@QueryHandler(LoginUserQuery)
export class LoginUserQueryHandler implements IQueryHandler {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly jwtProvider: JwtProvider,
  ) {}
  async execute(
    query: LoginUserQuery,
  ): Promise<Result<string, UserNotExistsError | UserPasswordNotCorrectError>> {
    const record = await this.userRepository.findByEmail(query.email);
    if (!record) return Err(new UserNotExistsError());
    if (!comparePassword(query.password, record.password))
      return Err(new UserPasswordNotCorrectError());
    const payload: JwtPayloadType = {
      id: record.id,
    };
    try {
      const tokens = this.jwtProvider.generateToken(payload);
      this.userRepository.saveRefreshToken(record.email, tokens.refreshToken);
      return Ok(tokens.accessToken);
    } catch (error: any) {
      throw Err(new DBSelectError(error));
    }
  }
}
