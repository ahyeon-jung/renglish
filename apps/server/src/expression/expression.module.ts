import { Dialogue } from "src/dialogue/entities/dialogue.entity";
import { DialogueModule } from "src/dialogue/dialogue.module";
import { Expression } from "./entities/expression.entity";
import { ExpressionController } from "./expression.controller";
import { ExpressionService } from "./expression.service";
import { Module } from "@nestjs/common";
import { Scene } from "src/scene/entities/scene.entity";
import { SceneModule } from "src/scene/scene.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Expression, Scene, Dialogue]), DialogueModule, SceneModule],
  controllers: [ExpressionController],
  providers: [ExpressionService],
})
export class ExpressionModule {}
