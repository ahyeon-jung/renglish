import { ConfigModule, ConfigService } from '@nestjs/config';

import { Dialogue } from 'src/dialogue/entities/dialogue.entity';
import { Inquiry } from 'src/inquiry/entities/inquiry.entity';
import { Module } from '@nestjs/common';
import { Movie } from 'src/movie/entities/movie.entity';
import { Notice } from 'src/notice/entities/notice.entity';
import { Scene } from 'src/scene/entities/scene.entity';
import { Speaker } from 'src/speaker/entities/speaker.entity';
import { Statistic } from 'src/statistic/entities/statistic.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Writing } from 'src/writing/entities/writing.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Movie, Scene, User, Writing, Speaker, Dialogue, Notice, Statistic, Inquiry],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
