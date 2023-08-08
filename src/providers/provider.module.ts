import { Module } from '@nestjs/common';
import { JwtProvider } from './jwt.provider';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  providers: [JwtProvider],
  exports: [JwtProvider],
})
export class ProviderModule {}
