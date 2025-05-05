import { Dialogue } from "src/dialogue/entities/dialogue.entity";
import { Module } from "@nestjs/common";
import { Scene } from "src/scene/entities/scene.entity";
import { Speaker } from "./entities/speaker.entity";
import { SpeakerController } from "./speaker.controller";
import { SpeakerService } from "./speaker.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Speaker, Scene, Dialogue])],
  controllers: [SpeakerController],
  providers: [SpeakerService],
  exports: [SpeakerService],
})
export class SpeakerModule {}
