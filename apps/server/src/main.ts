import * as expressBasicAuth from 'express-basic-auth';
import * as fs from 'fs';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import swaggerConfig from './configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  });

  app.useGlobalPipes(new ValidationPipe());

  app.use(
    [process.env.SWAGGER_UI_PATH, process.env.SWAGGER_JSON_PATH],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USERNAME]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  if (process.env.NODE_ENV === 'development') {
    fs.writeFileSync('../../swagger.json', JSON.stringify(document, null, 2));
  }

  app.use(process.env.SWAGGER_JSON_PATH, (_, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=swagger.json');

    res.send(JSON.stringify(document, null, 2));
  });

  SwaggerModule.setup(process.env.SWAGGER_UI_PATH, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
