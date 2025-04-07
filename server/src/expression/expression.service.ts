import { Injectable } from '@nestjs/common';
import { CreateExpressionDto } from './dto/create-expression.dto';
import { UpdateExpressionDto } from './dto/update-expression.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expression } from './entities/expression.entity';
import { Repository } from 'typeorm';
import { getWeekNumber, seededShuffle } from 'src/common/utils/random.util';

@Injectable()
export class ExpressionService {
  constructor(
    @InjectRepository(Expression)
    private readonly expressionRepository: Repository<Expression>,
  ) {}

  create(createExpressionDto: CreateExpressionDto) {
    return this.expressionRepository.save(createExpressionDto);
  }

  async findWeeklyExpressions() {
    const now = new Date();
    const week = getWeekNumber(now);
    const year = now.getFullYear();
    const seed = parseInt(`${year}${week}`);

    const all = await this.expressionRepository.find();
    const shuffled = seededShuffle(all, seed);

    return shuffled.slice(0, 10);
  }

  async findOne(id: string) {
    const expression = await this.expressionRepository.findOne({
      where: { id },
    });
    if (!expression) {
      throw new Error(`Expression with id ${id} not found`);
    }
    return expression;
  }

  async update(id: string, updateExpressionDto: UpdateExpressionDto) {
    const expression = await this.findOne(id);

    const updated = this.expressionRepository.merge(expression, updateExpressionDto);

    return await this.expressionRepository.save(updated);
  }

  async remove(id: string) {
    const expression = await this.findOne(id);

    return this.expressionRepository.remove(expression);
  }
}
