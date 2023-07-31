import { Module } from '@nestjs/common';
import { RequestContextModule } from 'nestjs-request-context';
import { UserMddule } from './modules/user/user.module';

@Module({
  imports: [RequestContextModule,UserMddule],
  controllers: [],
  providers: [],
  
})
export class AppModule {}
