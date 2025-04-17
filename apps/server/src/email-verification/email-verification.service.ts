import * as Mail from 'nodemailer/lib/mailer';

import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { CACHE_MANAGER } from '@nestjs/common/cache';
import { Cache } from 'cache-manager';
import { SendEmailDto } from './dto/send-email.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';

@Injectable()
export default class EmailVerificationService {
  private nodemailerTransport: Mail;

  constructor(
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.nodemailerTransport = createTransport({
      service: configService.get('EMAIL_VERIFICATION_SERVICE'),
      auth: {
        user: configService.get('EMAIL_VERIFICATION_USER'),
        pass: configService.get('EMAIL_VERIFICATION_PASSWORD'),
      },
    });
  }

  _generateOTP() {
    let OTP = '';
    for (let i = 0; i < 6; i++) {
      OTP += Math.floor(Math.random() * 10);
    }
    return OTP;
  }

  async sendMail(sendEmailDto: SendEmailDto): Promise<Mail.Options> {
    const { email } = sendEmailDto;
    const generateNumber = this._generateOTP();
    await this.cacheManager.set(email, generateNumber);

    return this.nodemailerTransport.sendMail({
      to: email,
      subject: 'Renglish - Verification Email Address',
      html: `<h1>CODE: ${generateNumber}</h1>`,
    });
  }

  async verifyCode(verifyCodeDto: VerifyCodeDto): Promise<void> {
    const { email, code } = verifyCodeDto;
    const redisCode = await this.cacheManager.get(email);

    if (!redisCode) {
      throw new NotFoundException('Not found email code');
    }

    if (redisCode !== code) {
      throw new HttpException('wrong code', HttpStatus.BAD_REQUEST);
    }

    this.cacheManager.set(email, this.configService.get('EMAIL_VERIFICATION_PASS'));

    return;
  }
}
