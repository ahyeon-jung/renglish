import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { StatisticService } from './statistic.service';
import { Statistic } from './entities/statistic.entity';
import { randomUUID } from 'crypto';

@ApiTags('Statistics')
@Controller('statistics')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Post('/visitor')
  @ApiOperation({
    summary: '방문자 row 추가(관리자 전용)',
  })
  async createStaticsRow(): Promise<Statistic> {
    return this.statisticService.create();
  }

  @Post('/visitor/count')
  @ApiOperation({
    summary: '방문자 수 업데이트하기',
    description: '현재 방문자를 식별하여 첫 방문의 경우 카운트합니다.',
  })
  async updateVisitorCount(@Req() req: Request, @Res() res: Response) {
    let visitorId = req.cookies['visitorId'];

    if (!visitorId) {
      visitorId = randomUUID();
      res.cookie('visitorId', visitorId, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      });
      this.statisticService.incrementVisitCount(visitorId);
      res.send({ message: 'Visitor count successfully', visitorId });
    }

    res.send({ message: 'Already visited user', visitorId });
  }

  @Get('/visitor/count')
  @ApiOperation({
    summary: '방문자 수 조회하기',
    description: '현재 몇명이 방문했는지 조회합니다',
  })
  async getVisitorCount(): Promise<number> {
    return this.statisticService.getVisitorCount();
  }
}
