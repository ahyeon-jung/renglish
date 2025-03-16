import { Dialogue } from "./entities/dialogue.entity";
import { DialogueController } from "./dialogue.controller";
import { DialogueService } from "./dialogue.service";
import { Module } from "@nestjs/common";
import { Scene } from "src/scene/entities/scene.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  controllers: [DialogueController],
  providers: [DialogueService],
})
export class DialogueModule {}
