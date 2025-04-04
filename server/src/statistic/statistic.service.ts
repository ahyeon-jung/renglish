import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/common/cache';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Statistic } from './entities/statistic.entity';

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(Statistic)
    private readonly statisticRepository: Repository<Statistic>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create() {
    return this.statisticRepository.save({ id: '1', type: 'visitor', count: 0 });
  }

  async incrementVisitCount(sessionId: string): Promise<void> {
    const exists = await this.cacheManager.get(sessionId);

    if (!exists) {
      await this.cacheManager.set(sessionId, 1800, '1');

      const visitor = await this.statisticRepository.findOne({
        where: { id: '1' },
      });

      if (!visitor) {
        throw new NotFoundException('Visitor Statistic count no exists');
      }
      this.statisticRepository.update(visitor.id, { count: visitor.count + 1 });
      return;
    }

    return;
  }

  async getVisitorCount(): Promise<number> {
    const visitor = await this.statisticRepository.findOne({
      where: { id: '1' },
    });

    return visitor.count;
  }
}
