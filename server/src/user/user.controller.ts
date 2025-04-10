import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationResponse } from 'src/common/utils/pagination.util';
import { ExcludedPasswordUser } from './types/excluded-password-user';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: '모든 사용자 정보 가져오기',
    description: '모든 사용자 정보를 가져옵니다.',
  })
  @ApiResponse({
    status: 200,
    description: '모든 사용자 정보 가져오기 성공',
    schema: {
      example: {
        statusCode: 200,
        message: 'Request successful',
        data: {
          data: [
            {
              id: '0',
              createdAt: '2025-03-23T10:17:38.718Z',
              updatedAt: '2025-03-23T10:19:00.754Z',
              deletedAt: null,
              email: 'jah512@naver.com',
            },
          ],
          totalCount: 1,
          currentPage: 1,
          totalPages: 1,
        },
      },
    },
  })
  @ApiQuery({
    name: 'offset',
    description: '가져올 페이지 번호 (기본값: 1)',
    example: 1,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    description: '한 페이지에 가져올 데이터 개수 (기본값: 10)',
    example: 10,
    type: Number,
  })
  async findAll(
    @Query('offset') offset: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<PaginationResponse<ExcludedPasswordUser>> {
    return this.userService.findAll({ offset, limit });
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
  async findUserById(@Param('userId') userId: string): Promise<ExcludedPasswordUser> {
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
  async checkExistByEmail(@Param('email') email: string): Promise<ExcludedPasswordUser> {
    const user = await this.userService.findUserByEmail(email);
    return user;
  }
}
