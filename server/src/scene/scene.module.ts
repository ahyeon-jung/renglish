import { Module, forwardRef } from '@nestjs/common';

import { Dialogue } from 'src/dialogue/entities/dialogue.entity';
import { Expression } from 'src/expression/entities/expression.entity';
import { Movie } from 'src/movie/entities/movie.entity';
import { MovieModule } from 'src/movie/movie.module';
import { Scene } from './entities/scene.entity';
import { SceneController } from './scene.controller';
import { SceneService } from './scene.service';
import { Speaker } from 'src/speaker/entities/speaker.entity';
import { SpeakerModule } from 'src/speaker/speaker.module';
import { Study } from 'src/study/entities/study.entity';
import { StudyModule } from 'src/study/study.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie, Scene, Dialogue, Speaker, Expression, Study]),
    SpeakerModule,
    StudyModule,
    forwardRef(() => MovieModule),
  ],
  controllers: [SceneController],
  providers: [SceneService],
  exports: [SceneService],
})
export class SceneModule {}
