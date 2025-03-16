import { Module } from '@nestjs/common';
import { SpeakerService } from './speaker.service';
import { SpeakerController } from './speaker.controller';

@Module({
  controllers: [SpeakerController],
  providers: [SpeakerService],
})
export class SpeakerModule {}
