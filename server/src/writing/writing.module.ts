import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Writing } from './entities/writing.entity';
import { WritingController } from './writing.controller';
import { WritingService } from './writing.service';

@Module({
  imports: [TypeOrmModule.forFeature([Writing])],
  controllers: [WritingController],
  providers: [WritingService],
})
export class WritingModule {}
