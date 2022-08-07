import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import jwtAuthMetadata from './jwt-auth.metadata';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isAllow = this.reflector.getAllAndOverride<boolean>(
      jwtAuthMetadata.IS_ALLOW,
      [context.getHandler(), context.getClass()],
    );
    if (isAllow) {
      return true;
    }
    return super.canActivate(context);
  }
}
