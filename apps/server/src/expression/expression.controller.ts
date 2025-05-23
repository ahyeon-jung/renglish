import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ExpressionService } from './expression.service';
import { CreateExpressionDto } from './dto/create-expression.dto';
import { UpdateExpressionDto } from './dto/update-expression.dto';
import { ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { TAG } from 'src/common/constants/tag';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { AdminTokenGuard } from 'src/auth/guards/admin-token.guard';
import { Expression } from './entities/expression.entity';
import { DeleteResult } from 'typeorm';

@Controller('expressions')
export class ExpressionController {
  constructor(private readonly expressionService: ExpressionService) {}

  @Get('/weekly')
  @ApiOperation({
    summary: '이번주 영어 표현 가져오기',
    description: '이번주 영어 표현을 10개 가져옵니다.',
  })
  @ApiOkResponse({
    type: [Expression],
    description: '이번주 영어 표현 10개',
  })
  findWeeklyExpressions(): Promise<Expression[]> {
    return this.expressionService.findWeeklyExpressions();
  }

  @Get('/:sceneId')
  @UseGuards(AccessTokenGuard)
  @ApiOperation({
    summary: `해당 장면의 영어 표현 가져오기 ${TAG.TOKEN_REQUIRED}`,
    description: '해당 장면의 영어 표현 가져오기',
  })
  @ApiParam({
    name: 'sceneId',
    description: '장면의 ID',
    example: '6ef26cb3-746c-4df1-90e0-66805f3f8320',
    type: String,
  })
  @ApiOkResponse({
    type: [Expression],
  })
  findExpressionBySceneId(@Param('sceneId') sceneId: string): Promise<Expression[]> {
    return this.expressionService.findExpressionsBySceneId(sceneId);
  }

  @Post('/:sceneId')
  @UseGuards(AdminTokenGuard)
  @ApiOperation({
    summary: `영어 표현 추가하기 ${TAG.ADMIN_REQUIRED}`,
    description: '해당 장면의 영어 표현 추가하기',
  })
  @ApiParam({
    name: 'sceneId',
    description: '장면의 ID',
    example: '6ef26cb3-746c-4df1-90e0-66805f3f8320',
    type: String,
  })
  create(@Body() createExpressionDto: CreateExpressionDto): Promise<Expression> {
    return this.expressionService.create(createExpressionDto);
  }

  @Put('/:expressionId')
  @UseGuards(AdminTokenGuard)
  @ApiOperation({
    summary: `영어 표현 수정하기 ${TAG.ADMIN_REQUIRED}`,
    description: '영어 표현 수정하기',
  })
  @ApiParam({
    name: 'expressionId',
    description: '영어 표현의 ID',
    example: '6ef26cb3-746c-4df1-90e0-66805f3f8320',
    type: String,
  })
  update(
    @Param('expressionId') id: string,
    @Body() updateExpressionDto: UpdateExpressionDto,
  ): Promise<Expression> {
    return this.expressionService.update(id, updateExpressionDto);
  }

  @Delete('/:expressionId')
  @UseGuards(AdminTokenGuard)
  @ApiOperation({
    summary: `영어 표현 삭제하기 ${TAG.ADMIN_REQUIRED}`,
    description: '영어 표현 수정하기',
  })
  @ApiParam({
    name: 'expressionId',
    description: '영어 표현의 ID',
    example: '6ef26cb3-746c-4df1-90e0-66805f3f8320',
    type: String,
  })
  remove(@Param('expressionId') id: string): Promise<DeleteResult> {
    return this.expressionService.remove(id);
  }
}
