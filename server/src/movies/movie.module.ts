import { Module } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MovieController } from './movie.controller';
import { MovieScene } from './entities/movie-scene.entity';
import { MovieSceneDialogue } from './entities/movie-scene-dialogue.entity';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, MovieScene, MovieSceneDialogue])],
  providers: [MovieService],
  controllers: [MovieController],
})
export class MovieModule {}
