import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Protocol = createParamDecorator(
  (defaulValue: unknown, ctx: ExecutionContext) => {
    console.log({ defaulValue });
    const request = ctx.switchToHttp().getRequest();
    return request.protocol;
  },
);
