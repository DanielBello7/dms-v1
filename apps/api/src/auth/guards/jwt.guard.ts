import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ReqExpress, ReqValidUser } from '@/auth/types/auth.types';
import { JwtService } from '@nestjs/jwt';

/**
 * this is what runs whenever you place it infront of a particular controller
 * UseGuard(JwtGuard)
 */
@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(context: ExecutionContext) {
    const request: ReqExpress = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedException();
    } else {
      const token = authorization.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = this.jwt.verify(token);
        if (!payload) throw new UnauthorizedException();
        request.user = {
          ...payload,
          token,
        } satisfies ReqValidUser;
        return true;
      } catch (e) {
        throw new UnauthorizedException(e);
      }
    }
  }
}
