import { ConfigModule } from "@nestjs/config";
import { EmailVerificationController } from "./email-verification.controller";
import EmailVerificationService from "./email-verification.service";
import { Module } from "@nestjs/common";

@Module({
  imports: [ConfigModule],
  controllers: [EmailVerificationController],
  providers: [EmailVerificationService],
  exports: [EmailVerificationService],
})
export class EmailVerificationModule {}
