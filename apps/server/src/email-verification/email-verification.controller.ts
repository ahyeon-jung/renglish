import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import EmailVerificationService from './email-verification.service';
import { SendEmailDto } from './dto/send-email.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import Mail from 'nodemailer/lib/mailer';

@ApiTags('Email Verification')
@Controller('email-verification')
export class EmailVerificationController {
  constructor(private readonly emailVerificationService: EmailVerificationService) {}

  @Post('/send-email')
  @ApiOperation({
    summary: '회원가입 이메일 인증코드 요청',
    description: '회원가입을 위한 이메일로로 인증 코드를 요청합니다.',
  })
  @ApiBody({ type: SendEmailDto })
  sendEmailWithOTP(@Body() sendEmailDto: SendEmailDto): Promise<Mail.Options> {
    return this.emailVerificationService.sendMail(sendEmailDto);
  }

  @Post('/verify-code')
  @ApiOperation({
    summary: '회원가입 인증코드 확인',
    description: '받은 인증 코드가 올바른지 확인합니다.',
  })
  @ApiBody({ type: VerifyCodeDto })
  verifyCode(@Body() verifyCodeDto: VerifyCodeDto): Promise<void> {
    return this.emailVerificationService.verifyCode(verifyCodeDto);
  }
}
