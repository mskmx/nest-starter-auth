import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Usuario } from 'src/common/entities/usuario.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): Usuario => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
