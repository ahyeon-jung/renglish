import { Dialogue } from "src/dialogue/entities/dialogue.entity";
import { Module } from "@nestjs/common";
import { Scene } from "./entities/scene.entity";
import { SceneController } from "./scene.controller";
import { SceneService } from "./scene.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Scene, Dialogue])],
  controllers: [SceneController],
  providers: [SceneService],
})
export class SceneModule {}
