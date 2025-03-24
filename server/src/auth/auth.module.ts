import { ConfigModule, ConfigService } from '@nestjs/config';

import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalAuthStrategy } from './strategies/local-auth-strategy';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, LocalAuthStrategy],
  exports: [AuthService],
})
export class AuthModule {}
