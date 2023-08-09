import { Module, Provider } from '@nestjs/common';
import { CreateUserController } from './commands/create-user/create-user.controller';
import { CreateUserCommandHandler } from './commands/create-user/create-user.service';
import { UserRepository } from './database/user.repository';
import { USER_REPOSITORY } from './user.di-token';
import { CqrsModule } from '@nestjs/cqrs';
import { LoginUserController } from './queries/login-user/login-user.controller';
import { LoginUserQueryHandler } from './queries/login-user/login-user.service';
import { ProviderModule } from '@src/providers/provider.module';
import { JwtProvider } from '@src/providers/jwt.provider';
import { JwtService } from '@nestjs/jwt';

const httpControllers = [CreateUserController, LoginUserController];
const commandHandlers: Provider[] = [CreateUserCommandHandler];
const queryHandlers: Provider[] = [LoginUserQueryHandler];
const repositories: Provider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepository },
];
@Module({
  imports: [CqrsModule, ProviderModule],
  controllers: [...httpControllers],
  providers: [
    ...repositories,
    ...commandHandlers,
    ...queryHandlers,
    JwtProvider,
    JwtService,
  ],
})
export class UserMddule {}
