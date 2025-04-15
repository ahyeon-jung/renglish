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

  async findOne(id: string): Promise<Expression> {
    const expression = await this.expressionRepository.findOne({
      where: { id },
    });

    return expression;
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

  async findExpressionsBySceneId(sceneId: string): Promise<Expression[]> {
    const expressions = await this.expressionRepository.find({
      where: {
        scene: { id: sceneId },
      },
      relations: ['scene'],
    });

    if (!expressions || expressions.length === 0) {
      throw new Error(`No expressions found for sceneId ${sceneId}`);
    }

    return expressions;
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
