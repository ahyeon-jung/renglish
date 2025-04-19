import { PartialType } from '@nestjs/swagger';
import { CreateExpressionDto } from './create-expression.dto';

export class UpdateExpressionDto extends PartialType(CreateExpressionDto) {}
