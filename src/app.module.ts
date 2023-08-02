import { Module, Provider } from '@nestjs/common';
import { RequestContextModule } from 'nestjs-request-context';
import { UserMddule } from './modules/user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ContextInterceptor } from './libs/application/context/context.interceptor';
import { ExceptionInterceptor } from './libs/application/interceptors/exception.interceptor';

const interceptors : Provider[] = [
  {
    provide : APP_INTERCEPTOR,
    useClass : ContextInterceptor
  },
  {
    provide:APP_INTERCEPTOR,
  useClass: ExceptionInterceptor
}
]
@Module({
  imports: [RequestContextModule,UserMddule],
  controllers: [],
  providers: [...interceptors],
  
})
export class AppModule {}
