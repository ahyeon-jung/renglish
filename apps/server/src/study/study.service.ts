import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Scene } from 'src/scene/entities/scene.entity';
import { User } from 'src/user/entities/user.entity';
import type { DeleteResult, Repository } from 'typeorm';
import type { CreateStudyDto } from './dto/create-study.dto';
import type { UpdateStudyDto } from './dto/update-study.dto';
import { Study } from './entities/study.entity';
import { STUDY_STATUS } from './enums/study-status.enum';

import type { PaginationParams } from 'src/common/dto/pagination-params.dto';
import type { PaginationResponse } from 'src/common/utils/pagination.util';
import type { GetStudyParams, StudyDto } from './dto/get-study.dto';
import type { ExtendedFilteredStudy, } from './types/filtered-study';

@Injectable()
export class StudyService {
  constructor(
    @InjectRepository(Study)
    private studyRepository: Repository<Study>,
    @InjectRepository(Scene)
    private sceneRepository: Repository<Scene>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(sceneId: string, createStudyDto: CreateStudyDto): Promise<Study> {
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

    return await this.studyRepository.save(study);
  }

  async findAll(
    userId: string,
    params: GetStudyParams & PaginationParams,
  ): Promise<PaginationResponse<ExtendedFilteredStudy>> {
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
        'study.isCompleted',
        `GROUP_CONCAT(DISTINCT JSON_OBJECT('id', applicants.id, 'nickname', applicants.nickname)) AS applicantInfo`,
        `GROUP_CONCAT(DISTINCT JSON_OBJECT('id', participants.id, 'nickname', participants.nickname)) AS participantInfo`,
        'scene.id',
        'scene.title',
        'movie.title',
        'movie.imageUrl',
      ])
      .groupBy('study.id')
      .addGroupBy('scene.id')
      .addGroupBy('movie.id');

    if (status === STUDY_STATUS.RECRUITING) {
      baseQuery.where('study.isCompleted = false');
    } else if (status === STUDY_STATUS.COMPLETED) {
      baseQuery.where('study.isCompleted = true');
    }

    const totalCount = await baseQuery.getCount();

    const results = await baseQuery
      .orderBy('study.studiedAt', 'DESC')
      .offset(skip)
      .limit(take)
      .getRawMany();

    const data = results.map((row) => {
      const wrapped_applicants = `[${row.applicantInfo}]`;

      const applicants = JSON.parse(wrapped_applicants);

      const wrapped_participants = `[${row.participantInfo}]`;
      const participants = JSON.parse(wrapped_participants);

      return {
        id: row.study_id,
        title: row.study_title,
        description: row.study_description,
        studiedAt: row.study_studiedAt,
        participantCount: Number(row.participantCount),
        applicantCount: Number(row.applicantCount),
        applicants,
        participants,
        isCompleted: Boolean(row.study_isCompleted),
        scene: {
          id: row.scene_id,
          title: row.scene_title,
          speakers: [],
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

  async findOneEntity(id: string): Promise<Study> {
    const study = await this.studyRepository.findOne({
      where: { id },
      relations: ['scene', 'participants', 'applicants'],
    });
    if (!study) throw new NotFoundException('Study not found');

    return study;
  }

  async findOne(id: string): Promise<StudyDto> {
    const study = await this.studyRepository.findOne({
      where: { id },
      relations: ['scene', 'participants', 'applicants'],
    });
    if (!study) throw new NotFoundException('Study not found');

    return {
      ...study,
      isCompleted: study.studiedAt.getTime() > new Date().getTime(),
      participantCount: study.participants.length,
      applicantCount: study.applicants.length,
    };
  }

  async update(id: string, updateStudyDto: UpdateStudyDto): Promise<Study> {
    const study = await this.studyRepository.preload({
      id,
      ...updateStudyDto,
    });
    if (!study) throw new NotFoundException('Study not found');
    return this.studyRepository.save(study);
  }

  async remove(id: string): Promise<DeleteResult> {
    const study = await this.findOne(id);
    return this.studyRepository.delete(study);
  }

  async findByUser(userId: string, type?: string): Promise<ExtendedFilteredStudy[]> {
    const query = this.studyRepository
      .createQueryBuilder('study')
      .leftJoin('study.scene', 'scene')
      .leftJoin('scene.movie', 'movie')
      .leftJoin('study.applicants', 'applicants')
      .leftJoin('study.participants', 'participants')
      .select([
        'study.id',
        'study.title',
        'study.description',
        'study.studiedAt',
        'study.isCompleted',
        `GROUP_CONCAT(DISTINCT JSON_OBJECT('id', applicants.id, 'nickname', applicants.nickname)) AS applicantInfo`,
        `GROUP_CONCAT(DISTINCT JSON_OBJECT('id', participants.id, 'nickname', participants.nickname)) AS participantInfo`,
        'scene.id',
        'scene.title',
        'movie.title',
        'movie.imageUrl',
      ])
      .groupBy('study.id')
      .addGroupBy('scene.id')
      .addGroupBy('movie.id');

    if (type === 'participant') {
      query.where(qb =>
        `study.id IN (
            SELECT studyId FROM study_participants WHERE userId = :userId
          )`
      ).setParameter('userId', userId);
    } else if (type === 'applicant') {
      query.where(qb =>
        `study.id IN (
            SELECT studyId FROM study_applicants WHERE userId = :userId
          )`
      ).setParameter('userId', userId);
    } else {
      query.where(qb =>
        `study.id IN (
            SELECT studyId FROM study_participants WHERE userId = :userId
            UNION
            SELECT studyId FROM study_applicants WHERE userId = :userId
          )`
      ).setParameter('userId', userId);
    }

    const results = await query.getRawMany();

    const data: ExtendedFilteredStudy[] = results.map((row) => {
      const applicants = JSON.parse(`[${row.applicantInfo}]`);
      const participants = JSON.parse(`[${row.participantInfo}]`);

      return {
        id: row.study_id,
        title: row.study_title,
        description: row.study_description,
        studiedAt: row.study_studiedAt,
        isCompleted: Boolean(row.study_isCompleted),
        applicants,
        participants,
        applicantCount: applicants.length,
        participantCount: participants.length,
        scene: {
          id: row.scene_id,
          title: row.scene_title,
          speakers: [],
          movie: {
            title: row.movie_title,
            imageUrl: row.movie_imageUrl,
          },
        },
      };
    });

    return data;
  }


  async isMember(studyId: string, userId: string): Promise<{ isMember: boolean }> {
    const count = await this.studyRepository
      .createQueryBuilder('study')
      .leftJoin('study.participants', 'user')
      .where('study.id = :studyId', { studyId })
      .andWhere('user.id = :userId', { userId })
      .getCount();

    return { isMember: count > 0 };
  }

  async addApplicants(studyId: string, userId: string): Promise<Study> {
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

  async addParticipants(studyId: string, userId: string): Promise<Study | { message: string }> {
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

  async removeApplicant(studyId: string, userId: string): Promise<Study> {
    const study = await this.studyRepository.findOne({
      where: { id: studyId },
      relations: ['applicants'],
    });
    if (!study) throw new NotFoundException('Study not found');

    study.applicants = study.applicants.filter((user) => user.id !== userId);
    return this.studyRepository.save(study);
  }

  async removeParticipant(studyId: string, userId: string): Promise<Study> {
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

  async getMemberCount(studyId: string): Promise<{ count: number }> {
    const study = await this.studyRepository.findOne({
      where: { id: studyId },
      relations: ['participants'],
    });
    if (!study) throw new NotFoundException('Study not found');

    return { count: study.participants.length };
  }

  async completeStudy(studyId: string): Promise<Study> {
    const study = await this.studyRepository.findOne({
      where: { id: studyId },
    });
    if (!study) throw new NotFoundException('Study not found');
    study.isCompleted = true;
    return this.studyRepository.save(study);
  }
}
