import { Module } from '@nestjs/common';
import { Scene } from 'src/scene/entities/scene.entity';
import { Study } from './entities/study.entity';
import { StudyController } from './study.controller';
import { StudyService } from './study.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Study, User, Scene])],
  controllers: [StudyController],
  providers: [StudyService],
  exports: [StudyService],
})
export class StudyModule {}
