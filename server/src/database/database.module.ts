import { ConfigModule, ConfigService } from '@nestjs/config';

import { Module } from '@nestjs/common';
import { Movie } from '../movies/entities/movie.entity';
import { MovieScene } from 'src/movies/entities/movie-scene.entity';
import { MovieSceneDialogue } from 'src/movies/entities/movie-scene-dialogue.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

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
        entities: [Movie, MovieScene, MovieSceneDialogue],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
