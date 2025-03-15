import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { APP_FILTER } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { LoggerMiddleware } from "./common/middlewares/logger.middleware";
import { LoggerModule } from "./logger/logger.module";
import { MovieModule } from "./movies/movie.module";

@Module({
  imports: [LoggerModule, DatabaseModule, AuthModule, MovieModule],
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
