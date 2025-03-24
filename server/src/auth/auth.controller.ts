import { Body, Controller, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/update-auth.dto';
import { AccessTokenGuard } from './guards/access-token.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    summary: '회원가입(Email Verification 필요)',
    description: '새로운 사용자를 생성합니다.',
  })
  @ApiResponse({ status: 201, description: '회원가입 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청 데이터' })
  @ApiBody({ type: CreateUserDto })
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('login')
  @ApiOperation({
    summary: '로그인',
    description: '사용자가 로그인을 시도합니다.',
  })
  @ApiResponse({ status: 200, description: '로그인 성공' })
  @ApiResponse({ status: 401, description: '인증 실패' })
  @ApiBody({ type: LoginDto })
  login(@Body() loginAuthDto: LoginDto) {
    return this.authService.login(loginAuthDto);
  }

  @Get('token/:token')
  @ApiOperation({
    summary: '토큰 유효성 검사',
    description: '토큰이 유효한지 확인합니다.',
  })
  @ApiResponse({ status: 200, description: '로그인 성공' })
  @ApiResponse({ status: 401, description: '인증 실패' })
  @ApiParam({
    name: 'token',
    description: '토큰',
    example: 'e5e798e1-9241-4b95-8e2c-0b630bbd033f',
    type: String,
  })
  validateToken(@Param('token') token: string) {
    return this.authService.validateToken(token);
  }

  @Get('check/admin')
  @UseGuards(AccessTokenGuard)
  @ApiOperation({
    summary: '관리자 확인',
    description: '현재 사용자가 관리자인지 확인합니다.',
  })
  async checkAdminByToken(@Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    const user = await this.authService.getUserFromToken(token);

    return { isAdmin: user.id === '0' };
  }

  @Get('user')
  @UseGuards(AccessTokenGuard)
  @ApiOperation({
    summary: '현재 사용자 정보 가져오기',
    description: '현재 사용자 정보를 가져옵니다.',
  })
  findUserByToken(@Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    return this.authService.getUserFromToken(token);
  }

  @Put('password/change')
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
