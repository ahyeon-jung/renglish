import { Dialogue } from './entities/dialogue.entity';
import { DialogueController } from './dialogue.controller';
import { DialogueService } from './dialogue.service';
import { Module } from '@nestjs/common';
import { Scene } from 'src/scene/entities/scene.entity';
import { Speaker } from 'src/speaker/entities/speaker.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Writing } from 'src/writing/entities/writing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dialogue, Scene, Speaker, Writing])],
  controllers: [DialogueController],
  providers: [DialogueService],
  exports: [DialogueService],
})
export class DialogueModule {}
