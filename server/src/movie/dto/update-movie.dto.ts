import { PartialType, PickType } from '@nestjs/swagger';

import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
export class UpdateMovieImageDto extends PickType(CreateMovieDto, ['imageUrl']) {}
