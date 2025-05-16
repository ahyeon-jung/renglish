import { Inquiry } from "src/inquiry/entities/inquiry.entity";
import { Module } from "@nestjs/common";
import { Study } from "src/study/entities/study.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { Writing } from "src/writing/entities/writing.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Writing, Inquiry, Study])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
