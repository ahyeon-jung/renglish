import { Dialogue } from 'src/dialogue/entities/dialogue.entity';
import { DialogueModule } from 'src/dialogue/dialogue.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Writing } from './entities/writing.entity';
import { WritingController } from './writing.controller';
import { WritingService } from './writing.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Dialogue, Writing]),
    DialogueModule,
  ],
  controllers: [WritingController],
  providers: [WritingService],
})
export class WritingModule {}
