import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { APP_FILTER } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { DialogueModule } from "./dialogue/dialogue.module";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { LoggerMiddleware } from "./common/middlewares/logger.middleware";
import { LoggerModule } from "./logger/logger.module";
import { MovieModule } from "./movie/movie.module";
import { SceneModule } from "./scene/scene.module";
import { SpeakerModule } from "./speaker/speaker.module";
import { UserModule } from "./user/user.module";
import { WritingModule } from "./writing/writing.module";

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    AuthModule,
    MovieModule,
    UserModule,
    SceneModule,
    SpeakerModule,
    DialogueModule,
    WritingModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
