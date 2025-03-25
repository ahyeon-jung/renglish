import { AccessTokenStrategy } from 'src/auth/strategies/access-token.strategy';
import { Inquiry } from './entities/inquiry.entity';
import { InquiryController } from './inquiry.controller';
import { InquiryService } from './inquiry.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Inquiry])],
  controllers: [InquiryController, AccessTokenStrategy],
  providers: [InquiryService],
})
export class InquiryModule {}
