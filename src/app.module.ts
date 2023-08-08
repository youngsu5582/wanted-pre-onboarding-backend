import { Module, Provider } from '@nestjs/common';
import { RequestContextModule } from 'nestjs-request-context';
import { UserMddule } from './modules/user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ContextInterceptor } from './libs/application/context/context.interceptor';
import { ExceptionInterceptor } from './libs/application/interceptors/exception.interceptor';
import { ConfigModule } from '@nestjs/config';

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
  imports: [RequestContextModule,UserMddule,ConfigModule.forRoot({isGlobal:true,cache:true})],
  controllers: [],
  providers: [...interceptors],
  
})
export class AppModule {}
