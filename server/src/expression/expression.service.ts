import { Injectable } from '@nestjs/common';
import { CreateExpressionDto } from './dto/create-expression.dto';
import { UpdateExpressionDto } from './dto/update-expression.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expression } from './entities/expression.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExpressionService {
  constructor(
    @InjectRepository(Expression)
    private readonly expressionRepository: Repository<Expression>,
  ) {}

  create(createExpressionDto: CreateExpressionDto) {
    return this.expressionRepository.save(createExpressionDto);
  }

  findAll() {
    return `This action returns all expression`;
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
