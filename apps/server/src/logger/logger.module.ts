import { LoggerService } from './logger.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
