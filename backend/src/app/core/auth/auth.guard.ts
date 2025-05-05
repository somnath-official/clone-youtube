import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_NO_AUTH } from './auth.decorator';
import { Jwt } from './jwt/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: Jwt,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isNoAuth = this.reflector.getAllAndOverride<boolean>(IS_NO_AUTH, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isNoAuth) return true;

    const request: Request = context.switchToHttp().getRequest();
    const access_token = this.extractTokenFromHeader(request);

    const { name, email, sub, _id } = await this.jwtService.verifyAccessToken(access_token)
    request.user = { name, email, sub, id: _id.toString() }
    
    return true;
  }

  private extractTokenFromHeader(request: Request): string {
    let token = ''

    if (request.cookies['access_token']) token = request.cookies['access_token']
    else if (request.headers.authorization){
      const [_type, _token] = request.headers.authorization?.split(' ') ?? [];
      token =  _type.toLowerCase() === 'bearer' ? _token : '';
    }

    return token
  }
}
