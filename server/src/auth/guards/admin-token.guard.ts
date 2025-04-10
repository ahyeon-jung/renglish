import { AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminTokenGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    super();
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException('No token or invalid user');
    }

    const adminId = this.configService.get<string>('ADMIN_ID');

    if (user.id !== adminId) {
      throw new UnauthorizedException('Only admin can access this resource');
    }

    return user;
  }
}
