import { ExecutionContext, createParamDecorator } from '@nestjs/common';

/**
 * jwtPayload 에 담겨져 있는 userId 를 추출해주는 Decorator
 */
export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.data.jwtPayload.id;
  },
);
