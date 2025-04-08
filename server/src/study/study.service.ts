import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Study } from './entities/study.entity';
import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';
import { User } from 'src/user/entities/user.entity';
import { Scene } from 'src/scene/entities/scene.entity';
import { STUDY_STATUS } from './enums/study-status.enum';
import { plainToInstance } from 'class-transformer';
import { GetStudyParams } from './dto/get-study.dto';
import { PaginationParams } from 'src/common/dto/pagination-params.dto';
import { appendFile } from 'fs';

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

  async findAll(params: GetStudyParams & PaginationParams) {
    const { status, offset = 1, limit = 10 } = params;
    const skip = (offset - 1) * limit;
    const take = limit;

    const baseQuery = this.studyRepository
      .createQueryBuilder('study')
      .leftJoin('study.scene', 'scene')
      .leftJoin('scene.movie', 'movie')
      .leftJoin('study.participants', 'participants')
      .leftJoin('study.applicants', 'applicants')
      .select([
        'study.id',
        'study.title',
        'study.description',
        'study.studiedAt',
        'scene.id',
        'scene.title',
        'movie.title',
        'movie.imageUrl',
        'COUNT(DISTINCT participants.id) AS participantCount',
        'COUNT(DISTINCT applicants.id) AS applicantCount',
      ])
      .groupBy('study.id')
      .addGroupBy('scene.id')
      .addGroupBy('movie.id');

    if (status === STUDY_STATUS.RECRUITING) {
      baseQuery.where('study.studiedAt > NOW()');
    } else if (status === STUDY_STATUS.COMPLETED) {
      baseQuery.where('study.studiedAt <= NOW()');
    }

    const totalCount = await baseQuery.getCount();

    const results = await baseQuery
      .orderBy('study.studiedAt', 'DESC')
      .offset(skip)
      .limit(take)
      .getRawMany();

    const data = results.map((row) => {
      const studiedAt = new Date(row.study_studiedAt);
      const isCompleted = studiedAt.getTime() > new Date().getTime();

      return {
        id: row.study_id,
        title: row.study_title,
        description: row.study_description,
        studiedAt: row.study_studiedAt,
        participantCount: Number(row.participantCount),
        applicantCount: Number(row.applicantCount),
        isCompleted,
        scene: {
          id: row.scene_id,
          title: row.scene_title,
          movie: {
            title: row.movie_title,
            imageUrl: row.movie_imageUrl,
          },
        },
      };
    });
    return {
      data,
      totalCount,
      currentPage: offset,
      totalPages: Math.ceil(totalCount / limit),
    };
  }

  async findOne(id: string) {
    const study = await this.studyRepository.findOne({
      where: { id },
      relations: ['scene', 'participants', 'applicants'],
    });
    if (!study) throw new NotFoundException('Study not found');

    return { ...study, isCompleted: study.studiedAt.getTime() > new Date().getTime() };
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
      throw new ConflictException('User already joined');
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

    study.applicants = study.applicants.filter((u) => u.id !== userId);
    study.participants.push(user);

    return this.studyRepository.save(study);
  }

  async removeApplicant(studyId: string, userId: string) {
    const study = await this.studyRepository.findOne({
      where: { id: studyId },
      relations: ['applicants'],
    });
    if (!study) throw new NotFoundException('Study not found');

    study.applicants = study.applicants.filter((user) => user.id !== userId);
    return this.studyRepository.save(study);
  }

  async removeParticipant(studyId: string, userId: string) {
    const study = await this.studyRepository.findOne({
      where: { id: studyId },
      relations: ['participants', 'applicants'],
    });
    if (!study) throw new NotFoundException('Study not found');

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User not found');

    study.participants = study.participants.filter((user) => user.id !== userId);
    study.applicants.push(user);
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
