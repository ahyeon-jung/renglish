import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { Movie } from './movies/entities/movie.entity';
import { MovieModule } from './movies/movie.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [DatabaseModule, AuthModule, MovieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
