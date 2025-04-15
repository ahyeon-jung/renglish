import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class NaverAuthGuard extends AuthGuard('naver') {
  handleRequest(err: any, user: any, info: any, context: any) {
    return user;
  }
}