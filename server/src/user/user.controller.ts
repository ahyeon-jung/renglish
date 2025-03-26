import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationResponse } from 'src/common/utils/pagination.util';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: '모든 사용자 정보 가져오기',
    description: '모든 사용자 정보를 가져옵니다.',
  })
  @ApiResponse({ status: 200, description: '모든 사용자 정보 가져오기 성공' })
  @ApiQuery({
    name: 'offset',
    description: '가져올 페이지 번호 (기본값: 1)',
    example: 1,
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    description: '한 페이지에 가져올 데이터 개수 (기본값: 10)',
    example: 10,
    type: Number,
    required: false,
  })
  async findAll(
    @Query('offset') offset: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<PaginationResponse<Omit<User, 'password'>>> {
    return this.userService.findAll(offset, limit);
  }

  @Get(':userId')
  @ApiOperation({
    summary: '아이디로 사용자 찾기',
    description: '아이디로 사용자 정보를 가져옵니다.',
  })
  @ApiParam({
    name: 'userId',
    description: '사용자의 ID',
    example: 'e5e798e1-9241-4b95-8e2c-0b630bbd033f',
    type: String,
  })
  @ApiResponse({ status: 200, description: '사용자 정보 찾기 성공' })
  @ApiResponse({ status: 404, description: '사용자 정보 찾기 실패' })
  async findUserById(@Param('userId') userId: string): Promise<Omit<User, 'password'>> {
    const user = await this.userService.findUserById(userId);
    return user;
  }

  @Get('email/:email')
  @ApiOperation({
    summary: '이메일로 사용자 찾기',
    description: '이메일로 사용자 정보를 가져옵니다.',
  })
  @ApiParam({
    name: 'email',
    description: '사용자의 이메일',
    example: 'jah512@naver.com',
    type: String,
  })
  @ApiResponse({ status: 200, description: '사용자 정보 찾기 성공' })
  @ApiResponse({ status: 404, description: '사용자 정보 찾기 실패' })
  async checkExistByEmail(@Param('email') email: string): Promise<Omit<User, 'password'>> {
    const user = await this.userService.findUserByEmail(email);
    return user;
  }
}
