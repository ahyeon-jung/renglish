import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WritingService } from './writing.service';
import { CreateWritingDto } from './dto/create-writing.dto';
import { UpdateWritingDto } from './dto/update-writing.dto';

@Controller('writing')
export class WritingController {
  constructor(private readonly writingService: WritingService) {}

  @Post()
  create(@Body() createWritingDto: CreateWritingDto) {
    return this.writingService.create(createWritingDto);
  }

  @Get()
  findAll() {
    return this.writingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.writingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWritingDto: UpdateWritingDto) {
    return this.writingService.update(+id, updateWritingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.writingService.remove(+id);
  }
}
