import { Body, Controller, Get, Param, Post, Put, Request, UseGuards, Req, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/update-auth.dto';
import { AccessTokenGuard } from './guards/access-token.guard';
import { AuthGuard } from '@nestjs/passport';
import { TAG } from 'src/common/constants/tag';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { User } from 'src/user/entities/user.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserService } from 'src/user/user.service';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

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
  @ApiResponse({ status: 200, description: '로그인 성공' })
  async login(@Req() req) {
    return this.authService.login(req.user);
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
  
      const redirectUrl = new URL('http://localhost:3000/auth/callback');
      redirectUrl.searchParams.set('accessToken', accessToken);
      redirectUrl.searchParams.set('refreshToken', refreshToken);
  
      return res.redirect(redirectUrl.toString());
    }
  
    const registerRedirect = new URL('http://localhost:3000/auth/register/social');
    registerRedirect.searchParams.set('email', email);
    registerRedirect.searchParams.set('provider', 'kakao');
    registerRedirect.searchParams.set('providerId', providerId);
    registerRedirect.searchParams.set('nickname', name);
  
    return res.redirect(registerRedirect.toString());
  }
  

  @UseGuards(AuthGuard('google'))
  @Post('google')
  @ApiOperation({
    summary: '구글 로그인',
    description: '구글 계정으로 로그인합니다.',
  })
  async googleAuth(@Req() req) {}

  @UseGuards(AuthGuard('google'))
  @Post('google/callback')
  @ApiOperation({
    summary: '구글 로그인 콜백',
    description: '구글 로그인 후 콜백을 처리합니다.',
  })
  async googleAuthRedirect(@Req() req) {
    return `ㅇㅇㅇㅇㅇㅇㅇㅇㅇ`
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
  @UseGuards(AuthGuard('naver'))
  @ApiOperation({
    summary: '네이버 로그인 콜백',
    description: '네이버 로그인 후 콜백을 처리합니다.',
  })
  async naverCallback(@Request() req) {
    return this.authService.login({
      email: req.user.email,
      password: `naver_${req.user.providerId}`,
    });
  }
}