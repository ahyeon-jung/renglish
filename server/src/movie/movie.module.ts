import { Dialogue } from "src/dialogue/entities/dialogue.entity";
import { Module } from "@nestjs/common";
import { Movie } from "./entities/movie.entity";
import { MovieController } from "./movie.controller";
import { MovieService } from "./movie.service";
import { Scene } from "src/scene/entities/scene.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Scene, Dialogue])],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
