import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Study } from './entities/study.entity';
import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';
import { User } from 'src/user/entities/user.entity';
import { Scene } from 'src/scene/entities/scene.entity';
import { STUDY_STATUS } from './enums/study-status.enum';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class StudyService {
  constructor(
    @InjectRepository(Study)
    private studyRepository: Repository<Study>,

    @InjectRepository(Scene)
    private sceneRepository: Repository<Scene>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(sceneId: string, createStudyDto: CreateStudyDto) {
    const scene = await this.sceneRepository.findOne({
      where: { id: sceneId },
      relations: ['movie'],
    });
    if (!scene) {
      throw new NotFoundException(`Scene with ID ${sceneId} not found`);
    }

    const study = this.studyRepository.create({
      ...createStudyDto,
      scene,
    });

    const saved = await this.studyRepository.save(study);

    return {
      id: saved.id,
      title: saved.title,
      description: saved.description,
      studiedAt: saved.studiedAt,
      scene: {
        id: scene.id,
        movieImageUrl: scene.movie?.imageUrl,
      },
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    };
  }

  async findAll(status?: string) {
    const query = this.studyRepository
      .createQueryBuilder('study')
      .leftJoinAndSelect('study.scene', 'scene')
      .leftJoinAndSelect('study.participants', 'participants')
      .leftJoinAndSelect('study.applicants', 'applicants');

    if (status === STUDY_STATUS.RECRUITING) {
      query.where('study.studiedAt > NOW()');
    } else if (status === STUDY_STATUS.COMPLETED) {
      query.where('study.studiedAt <= NOW()');
    }

    query.orderBy('study.studiedAt', 'DESC');

    const studies = await query.getMany();
    return plainToInstance(Study, studies);
  }

  async findOne(id: string) {
    const study = await this.studyRepository.findOne({
      where: { id },
      relations: ['scene', 'participants'],
    });
    if (!study) throw new NotFoundException('Study not found');
    return study;
  }

  async update(id: string, updateStudyDto: UpdateStudyDto) {
    const study = await this.studyRepository.preload({
      id,
      ...updateStudyDto,
    });
    if (!study) throw new NotFoundException('Study not found');
    return this.studyRepository.save(study);
  }

  async remove(id: string) {
    const study = await this.findOne(id);
    return this.studyRepository.remove(study);
  }

  async findByUser(userId: string) {
    return this.studyRepository
      .createQueryBuilder('study')
      .leftJoin('study.participants', 'user')
      .where('user.id = :userId', { userId })
      .getMany();
  }

  async isMember(studyId: string, userId: string) {
    const count = await this.studyRepository
      .createQueryBuilder('study')
      .leftJoin('study.participants', 'user')
      .where('study.id = :studyId', { studyId })
      .andWhere('user.id = :userId', { userId })
      .getCount();

    return { isMember: count > 0 };
  }

  async addApplicants(studyId: string, userId: string) {
    const study = await this.studyRepository.findOne({
      where: { id: studyId },
      relations: ['participants', 'applicants'],
    });
    if (!study) throw new NotFoundException('Study not found');

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User not found');

    if (study.applicants.some((u) => u.id === userId)) {
      return { message: 'User already joined' };
    }

    study.applicants.push(user);
    return this.studyRepository.save(study);
  }

  async addParticipants(studyId: string, userId: string) {
    const study = await this.studyRepository.findOne({
      where: { id: studyId },
      relations: ['participants', 'applicants'],
    });
    if (!study) throw new NotFoundException('Study not found');

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User not found');

    if (!study.applicants.some((u) => u.id === userId)) {
      return { message: 'applicant first' };
    }

    if (study.participants.some((u) => u.id === userId)) {
      return { message: 'User already joined' };
    }

    study.participants.push(user);
    return this.studyRepository.save(study);
  }

  async removeMember(studyId: string, userId: string) {
    const study = await this.studyRepository.findOne({
      where: { id: studyId },
      relations: ['participants'],
    });
    if (!study) throw new NotFoundException('Study not found');

    study.participants = study.participants.filter((user) => user.id !== userId);
    return this.studyRepository.save(study);
  }

  async getMemberCount(studyId: string) {
    const study = await this.studyRepository.findOne({
      where: { id: studyId },
      relations: ['participants'],
    });
    if (!study) throw new NotFoundException('Study not found');

    return { count: study.participants.length };
  }
}
