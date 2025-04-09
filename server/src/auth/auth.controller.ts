import { Body, Controller, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/update-auth.dto';
import { AccessTokenGuard } from './guards/access-token.guard';
import { AuthGuard } from '@nestjs/passport';
import { TAG } from 'src/common/constants/tag';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiOperation({
    summary: `회원가입 ${TAG.EMAIL_VERIFICATION_REQUIRED}`,
    description: '새로운 사용자를 생성합니다.',
  })
  @ApiBody({ type: CreateUserDto })
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('/login')
  @ApiOperation({
    summary: '로그인',
    description: '사용자가 로그인을 시도합니다.',
  })
  @ApiBody({ type: LoginDto })
  login(@Body() loginAuthDto: LoginDto) {
    return this.authService.login(loginAuthDto);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('/refresh')
  @ApiOperation({
    summary: 'Access Token 재발급',
    description:
      '유효한 Refresh Token을 이용해 새로운 Access Token과 Refresh Token을 발급받습니다.',
  })
  async refresh(@Request() req) {
    const user = req.user;
    const tokens = await this.authService.generateTokens(user);
    return tokens;
  }

  @Get('/token/:token')
  @UseGuards(AccessTokenGuard)
  @ApiOperation({
    summary: `토큰 유효성 검사 ${TAG.TOKEN_REQUIRED}`,
    description: '토큰이 유효한지 확인합니다.',
  })
  @ApiParam({
    name: 'token',
    description: '토큰',
    example: 'e5e798e1-9241-4b95-8e2c-0b630bbd033f',
    type: String,
  })
  validateToken(@Param('token') token: string) {
    return { token };
  }

  @Get('/check/is-admin')
  @UseGuards(AccessTokenGuard)
  @ApiOperation({
    summary: `관리자 확인 ${TAG.TOKEN_REQUIRED}`,
    description: '현재 사용자가 관리자인지 확인합니다.',
  })
  async checkAdminByToken(@Request() req) {
    return { isAdmin: req.user.isAdmin };
  }

  @Get('/user')
  @UseGuards(AccessTokenGuard)
  @ApiOperation({
    summary: `현재 사용자 정보 가져오기 ${TAG.TOKEN_REQUIRED}`,
    description: '현재 사용자 정보를 가져옵니다.',
  })
  findUserByToken(@Request() req) {
    return req.user;
  }

  @Put('/password/change')
  @ApiOperation({
    summary: '비밀번호 변경',
    description: '사용자가 비밀번호 변경을 시도합니다.',
  })
  @ApiResponse({ status: 200, description: '비밀번호 변경 성공' })
  @ApiBody({ type: ChangePasswordDto })
  changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }
}
