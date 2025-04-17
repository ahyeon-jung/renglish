import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from './entities/notice.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
  ) {}

  create(createNoticeDto: CreateNoticeDto): Promise<Notice> {
    return this.noticeRepository.save(createNoticeDto);
  }

  findAll(): Promise<Notice[]> {
    return this.noticeRepository.find();
  }

  findOne(id: string): Promise<Notice> {
    return this.noticeRepository.findOne({ where: { id } });
  }

  async update(id: string, updateNoticeDto: UpdateNoticeDto): Promise<Notice> {
    const notice = await this.findOne(id);
    if (!notice) {
      throw new NotFoundException(`Notice with ID ${id} not found`);
    }

    await this.noticeRepository.update(id, updateNoticeDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<DeleteResult> {
    const notice = await this.findOne(id);
    if (!notice) {
      throw new NotFoundException(`Notice with ID ${id} not found`);
    }

    return this.noticeRepository.delete(id);
  }
}
