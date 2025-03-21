import { AuthModule } from 'src/auth/auth.module';
import { Inquiry } from './entities/inquiry.entity';
import { InquiryController } from './inquiry.controller';
import { InquiryService } from './inquiry.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inquiry, User]), AuthModule],
  controllers: [InquiryController],
  providers: [InquiryService],
})
export class InquiryModule {}
