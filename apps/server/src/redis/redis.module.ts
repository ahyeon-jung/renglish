import * as redisStore from 'cache-manager-redis-store';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { CacheModule } from '@nestjs/common/cache';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          store: redisStore,
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
          ttl: configService.get<number>('REDIS_TTL'),
          auth_pass: configService.get<string>('REDIS_PASSWORD'),
          username: configService.get<string>('REDIS_USER'),
        };
      },
      isGlobal: true,
    }),
  ],
})
export class RedisModule {}
