import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
<<<<<<< HEAD
    const {password, ...user} = request.user;
=======
    const {created_at,updated_at, ...user} = request.user;
>>>>>>> dc337b2690b378a0fb643c8e90f4e6fc78219ad1
    return user;
  },
);