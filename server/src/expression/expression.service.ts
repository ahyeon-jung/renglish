import { Injectable } from '@nestjs/common';
import { CreateExpressionDto } from './dto/create-expression.dto';
import { UpdateExpressionDto } from './dto/update-expression.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expression } from './entities/expression.entity';
import { DeleteResult, Repository } from 'typeorm';
import { getWeekNumber, seededShuffle } from 'src/common/utils/random.util';

@Injectable()
export class ExpressionService {
  constructor(
    @InjectRepository(Expression)
    private readonly expressionRepository: Repository<Expression>,
  ) {}

  create(createExpressionDto: CreateExpressionDto): Promise<Expression> {
    return this.expressionRepository.save(createExpressionDto);
  }

  async findWeeklyExpressions(): Promise<Expression[]> {
    const now = new Date();
    const week = getWeekNumber(now);
    const year = now.getFullYear();
    const seed = parseInt(`${year}${week}`);

    const all = await this.expressionRepository.find();
    const shuffled = seededShuffle(all, seed);

    return shuffled.slice(0, 10);
  }

  async findOne(id: string): Promise<Expression> {
    const expression = await this.expressionRepository.findOne({
      where: { id },
    });
    if (!expression) {
      throw new Error(`Expression with id ${id} not found`);
    }
    return expression;
  }

  async update(id: string, updateExpressionDto: UpdateExpressionDto): Promise<Expression> {
    const expression = await this.findOne(id);

    const updated = this.expressionRepository.merge(expression, updateExpressionDto);

    return await this.expressionRepository.save(updated);
  }

  async remove(id: string): Promise<DeleteResult> {
    const expression = await this.findOne(id);

    return this.expressionRepository.delete(expression);
  }
}
