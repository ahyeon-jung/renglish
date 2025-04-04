import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { UpdateInquiryDto } from './dto/update-inquiry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inquiry } from './entities/inquiry.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InquiryService {
  constructor(
    @InjectRepository(Inquiry)
    private readonly inquiryRepository: Repository<Inquiry>,
  ) {}

  async create(userId: string, createInquiryDto: CreateInquiryDto) {
    const inquiry = this.inquiryRepository.create({
      ...createInquiryDto,
      user: { id: userId },
    });

    return this.inquiryRepository.save(inquiry);
  }

  findAll() {
    return this.inquiryRepository.find();
  }

  findOne(id: string) {
    return this.inquiryRepository.findOne({ where: { id } });
  }

  async update(id: string, updateInquiryDto: UpdateInquiryDto) {
    const inquiry = await this.findOne(id);
    if (!inquiry) {
      throw new NotFoundException(`Inquiry with ID ${id} not found`);
    }

    await this.inquiryRepository.update(id, updateInquiryDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const inquiry = await this.findOne(id);
    if (!inquiry) {
      throw new NotFoundException(`Inquiry with ID ${id} not found`);
    }

    await this.inquiryRepository.delete(id);
    return `Inquiry with ID ${id} has been removed`;
  }
}
