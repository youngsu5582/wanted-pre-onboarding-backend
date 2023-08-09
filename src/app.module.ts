import { Module, Provider } from '@nestjs/common';
import { RequestContextModule } from 'nestjs-request-context';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ContextInterceptor } from './libs/application/context/context.interceptor';
import { ExceptionInterceptor } from './libs/application/interceptors/exception.interceptor';
import { ConfigModule } from '@nestjs/config';
import { UserMddule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';

const interceptors: Provider[] = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ContextInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ExceptionInterceptor,
  },
];
@Module({
  imports: [
    RequestContextModule,
    UserMddule,
    PostModule,
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
  ],
  controllers: [],
  providers: [...interceptors],
})
export class AppModule {}
