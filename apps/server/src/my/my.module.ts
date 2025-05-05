import { Module } from "@nestjs/common";
import { MyController } from "./my.controller";
import { StudyModule } from "src/study/study.module";
import { UserModule } from "src/user/user.module";
import { WritingModule } from "src/writing/writing.module";

@Module({
  imports: [UserModule, StudyModule, WritingModule],
  controllers: [MyController],
})
export class MyModule {}
