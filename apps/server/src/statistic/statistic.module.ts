import { ConfigModule, ConfigService } from "@nestjs/config";

import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { Statistic } from "./entities/statistic.entity";
import { StatisticController } from "./statistic.controller";
import { StatisticService } from "./statistic.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Statistic]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("ACCESS_TOKEN_SECRET"),
        signOptions: { expiresIn: "1h" },
      }),
    }),
  ],
  controllers: [StatisticController],
  providers: [StatisticService],
})
export class StatisticModule {}
