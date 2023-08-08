import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

export type JwtPayloadType = {
  id: string;
};

@Injectable()
export class JwtProvider {
  private readonly jwtAccessSecret: string;
  private readonly jwtRefreshSecret: string;
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService,
  ) {
    this.jwtAccessSecret =
      _configService.get('ACCESS_TOKEN_KEY') || 'InitTempKey1sncxpa';
    this.jwtRefreshSecret =
      _configService.get('REFRESH_TOKEN_KEY') || 'InitTempKey1snaxcpa';
  }
  generateAccessToken(payload: JwtPayloadType): string {
    return this._jwtService.sign(payload, { secret: this.jwtAccessSecret });
  }
  generateRefreshToken(payload: JwtPayloadType): string {
    return this._jwtService.sign(payload, { secret: this.jwtRefreshSecret });
  }
  decodeAccessToken(accessToken: string) {
    return this._jwtService.verify(accessToken, {
      secret: this.jwtAccessSecret,
    });
  }
  decodeRefreshToken(refreshToken: string) {
    return this._jwtService.verify(refreshToken, {
      secret: this.jwtRefreshSecret,
    });
  }
  generateToken(payload: JwtPayloadType) {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }
}
