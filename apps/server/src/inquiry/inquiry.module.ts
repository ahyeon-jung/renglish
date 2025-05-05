import { AccessTokenStrategy } from "src/auth/strategies/access-token.strategy";
import { Inquiry } from "./entities/inquiry.entity";
import { InquiryController } from "./inquiry.controller";
import { InquiryService } from "./inquiry.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";

@Module({
  imports: [TypeOrmModule.forFeature([Inquiry, User])],
  controllers: [InquiryController],
  providers: [InquiryService, UserService, AccessTokenStrategy],
})
export class InquiryModule {}
