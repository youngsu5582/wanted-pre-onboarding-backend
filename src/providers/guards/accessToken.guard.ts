import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtProvider } from '../jwt.provider';
import { extractAccesstoken } from '@src/utils/token';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  private readonly jwtAccessSecret;
  constructor(
    @Inject(JwtProvider) private jwtService: JwtProvider,
    private readonly _configService: ConfigService,
  ) {
    this.jwtAccessSecret = this._configService.get('app.jwtAccessSecret');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const token = extractAccesstoken(req);
      const jwtPayload = this.jwtService.decodeAccessToken(token!);
      req.data = {
        jwtPayload,
        token,
      };
      return true;
    } catch (err) {
      return false;
    }
  }
}
