import { Module } from '@nestjs/common';
import { MyController } from './my.controller';
import { StudyModule } from 'src/study/study.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule, StudyModule],
  controllers: [MyController],
})
export class MyModule {}
