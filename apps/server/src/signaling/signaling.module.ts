import { Module } from '@nestjs/common';
import { SignalingGateway } from './signaling.gateway';
import { SignalingService } from './signaling.service';

@Module({
  providers: [SignalingGateway, SignalingService],
})
export class SignalingModule { }
