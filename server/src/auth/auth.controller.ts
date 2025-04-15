import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiOkResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserService } from 'src/user/user.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { PasswordResetDto } from './dto/reset-password.dto';
import { OptionalTokenGuard } from './guards/optional-token.guard';
import { NaverAuthGuard } from './guards/naver-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) { }

  @UseGuards(OptionalTokenGuard)
  @Post('check/is-admin')
  @ApiOperation({
    summary: '관리자 여부 확인',
    description: '관리자 여부를 확인합니다.',
  })
  @ApiOkResponse({ type: Boolean })
  async checkIsAdmin(@Req() req) {
    return !!req.user.isAdmin;
  }

  @Post('register')
  @ApiOperation({
    summary: '회원가입',
    description: '새로운 사용자를 등록합니다.',
  })
  @ApiBody({ type: CreateUserDto })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary: '로그인',
    description: '사용자 로그인을 처리합니다.',
  })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: LoginResponseDto })
  async login(@Req() req) {
    return await this.authService.generateTokens({
      id: req.user.id,
      email: req.user.email,
    });
  }

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  @ApiOperation({
    summary: '카카오 로그인',
    description: '카카오 계정으로 로그인합니다.',
  })
  async kakaoLogin() {
    // 카카오 로그인 페이지로 리다이렉트
  }

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoCallback(@Request() req, @Res() res: Response) {
    const { email, providerId, name } = req.user;
    const user = await this.userService.findUserByEmail(email);

    if (user.provider === 'kakao') {
      const { accessToken, refreshToken } = await this.authService.generateTokens({
        id: user.id,
        email: user.email,
      });

      const redirectUrl = new URL(this.configService.get('CLIENT_URL'));
      redirectUrl.pathname = '/auth/callback';
      redirectUrl.searchParams.set('accessToken', accessToken);
      redirectUrl.searchParams.set('refreshToken', refreshToken);

      return res.redirect(redirectUrl.toString());
    }

    // 이미 존재하는 이메일의 경우 회원가입 불가능
    if (user.email === email && user.provider !== 'kakao') {
      const redirectUrl = new URL(this.configService.get('CLIENT_URL'));
      redirectUrl.pathname = '/auth/blocked';

      return res.redirect(redirectUrl.toString());
    }

    const registerRedirect = new URL(this.configService.get('CLIENT_URL'));
    registerRedirect.pathname = '/auth/register/social';
    registerRedirect.searchParams.set('email', email);
    registerRedirect.searchParams.set('provider', 'kakao');
    registerRedirect.searchParams.set('providerId', providerId);
    registerRedirect.searchParams.set('nickname', name);

    return res.redirect(registerRedirect.toString());
  }

  @UseGuards(AuthGuard('google'))
  @Get('google')
  @ApiOperation({
    summary: '구글 로그인',
    description: '구글 계정으로 로그인합니다.',
  })
  async googleAuth(@Req() req) { }

  @UseGuards(AuthGuard('google'))
  @Post('google/callback')
  @ApiOperation({
    summary: '구글 로그인 콜백',
    description: '구글 로그인 후 콜백을 처리합니다.',
  })
  async googleAuthRedirect(@Req() req) {
    return `ㅇㅇㅇㅇㅇㅇㅇㅇㅇ`;
  }

  @Get('naver')
  @UseGuards(AuthGuard('naver'))
  @ApiOperation({
    summary: '네이버 로그인',
    description: '네이버 계정으로 로그인합니다.',
  })
  async naverLogin() {
    // 네이버 로그인 페이지로 리다이렉트
  }

  @Get('naver/callback')
  @UseGuards(NaverAuthGuard)
  @ApiOperation({
    summary: '네이버 로그인 콜백',
    description: '네이버 로그인 후 콜백을 처리합니다.',
  })
  async naverCallback(@Request() req, @Res() res: Response) {
    const user = req.user;

    const socialAccount = await this.userService.checkIsSocialAccountByEmail(user.email, 'naver');

    if (!socialAccount) {
      const registerRedirect = new URL(this.configService.get('CLIENT_URL'));
      registerRedirect.pathname = '/auth/register/social';
      registerRedirect.searchParams.set('email', user.email);
      registerRedirect.searchParams.set('provider', user.provider);
      registerRedirect.searchParams.set('providerId', user.providerId);
      registerRedirect.searchParams.set('nickname', user.name);

      return res.redirect(registerRedirect.toString());
    }

    const { accessToken, refreshToken } = await this.authService.login({
      email: user.email,
      password: user.providerId,
    });

    const redirectUrl = new URL(this.configService.get('CLIENT_URL'));
    redirectUrl.pathname = '/auth/callback';
    redirectUrl.searchParams.set('access-token', accessToken);
    redirectUrl.searchParams.set('refresh-token', refreshToken);

    return res.redirect(redirectUrl.toString());
  }

  @Post('reset-password')
  @ApiOperation({
    summary: '비밀번호 초기화',
    description: '비밀번호 초기화를 처리합니다.',
  })
  @ApiBody({ type: PasswordResetDto })
  async passwordReset(@Body() passwordResetDto: PasswordResetDto) {
    return this.authService.passwordReset(passwordResetDto);
  }
}