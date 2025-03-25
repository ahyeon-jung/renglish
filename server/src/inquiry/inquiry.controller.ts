import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { InquiryService } from './inquiry.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { UpdateInquiryDto } from './dto/update-inquiry.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Inquiry } from './entities/inquiry.entity';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';

@ApiTags('Inquiries')
@Controller('inquiries')
export class InquiryController {
  constructor(private readonly inquiryService: InquiryService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @ApiOperation({
    summary: '문의사항 작성(Admin JWT 인증 필요)',
    description: '문의사항을 작성합니다.',
  })
  @ApiBody({ type: CreateInquiryDto })
  create(@Request() req, @Body() createInquiryDto: CreateInquiryDto) {
    if (!req.user.isAdmin) {
      throw new UnauthorizedException('Only Admins are allowed to create inquiries.');
    }

    return this.inquiryService.create(req.user.id, createInquiryDto);
  }

  @Get()
  @ApiOperation({
    summary: '모든 문의사항 가져오기',
    description: '모든 문의사항을 가져옵니다.',
  })
  async findAll(): Promise<Inquiry[]> {
    return this.inquiryService.findAll();
  }

  @Get(':inquiryId')
  @ApiOperation({
    summary: '해당 ID 문의사항 가져오기',
    description: '해당 ID의 문의사항을 가져옵니다.',
  })
  findOne(@Param('inquiryId') inquiryId: string) {
    return this.inquiryService.findOne(inquiryId);
  }

  @Patch(':inquiryId')
  @UseGuards(AccessTokenGuard)
  @ApiOperation({
    summary: '해당 ID 문의사항 업데이트(Admin JWT 인증 필요)',
    description: '해당 ID의 문의사항을 업데이트합니다.',
  })
  update(
    @Request() req,
    @Param('inquiryId') inquiryId: string,
    @Body() updateInquiryDto: UpdateInquiryDto,
  ) {
    if (!req.user.isAdmin) {
      throw new UnauthorizedException('Only Admins are allowed to update inquiries.');
    }
    return this.inquiryService.update(inquiryId, updateInquiryDto);
  }

  @Delete(':inquiryId')
  @UseGuards(AccessTokenGuard)
  @ApiOperation({
    summary: '해당 ID 문의사항 삭제(Admin JWT 인증 필요)',
    description: '해당 ID의 문의사항을 삭제합니다.',
  })
  remove(@Request() req, @Param('inquiryId') inquiryId: string) {
    if (!req.user.isAdmin) {
      throw new UnauthorizedException('Only Admins are allowed to delete inquiries.');
    }
    return this.inquiryService.remove(inquiryId);
  }
}
