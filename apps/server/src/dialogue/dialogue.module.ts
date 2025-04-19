import { Dialogue } from './entities/dialogue.entity';
import { DialogueController } from './dialogue.controller';
import { DialogueService } from './dialogue.service';
import { Expression } from 'src/expression/entities/expression.entity';
import { ExpressionModule } from 'src/expression/expression.module';
import { Module } from '@nestjs/common';
import { Scene } from 'src/scene/entities/scene.entity';
import { SceneModule } from 'src/scene/scene.module';
import { Speaker } from 'src/speaker/entities/speaker.entity';
import { SpeakerModule } from 'src/speaker/speaker.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Writing } from 'src/writing/entities/writing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dialogue, Writing, Expression]), SpeakerModule, SceneModule],
  controllers: [DialogueController],
  providers: [DialogueService],
  exports: [DialogueService],
})
export class DialogueModule {}
