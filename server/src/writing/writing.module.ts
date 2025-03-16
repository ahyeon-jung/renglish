import { Module } from '@nestjs/common';
import { WritingService } from './writing.service';
import { WritingController } from './writing.controller';

@Module({
  controllers: [WritingController],
  providers: [WritingService],
})
export class WritingModule {}
