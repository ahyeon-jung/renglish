import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';

@Module({ controllers: [AuthController], providers: [AuthService] })
export class AuthModule {}
