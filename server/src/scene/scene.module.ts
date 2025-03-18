import { Dialogue } from 'src/dialogue/entities/dialogue.entity';
import { Module } from '@nestjs/common';
import { Movie } from 'src/movie/entities/movie.entity';
import { Scene } from './entities/scene.entity';
import { SceneController } from './scene.controller';
import { SceneService } from './scene.service';
import { Speaker } from 'src/speaker/entities/speaker.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Scene, Dialogue, Speaker])],
  controllers: [SceneController],
  providers: [SceneService],
  exports: [SceneService],
})
export class SceneModule {}
