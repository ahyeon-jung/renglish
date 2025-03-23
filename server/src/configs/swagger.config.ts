import { DocumentBuilder } from '@nestjs/swagger';

const formatDescription = () => {
  const sentences = [
    `Download: <a href=${process.env.SWAGGER_JSON_PATH} target="_blank">click here</a>`,
    '',
    `github: <a href="https://github.com/ahyeon-jung/renglish" target="_blank">ahyeon-jung/renglish</a>`,
    'contact: ahyeon.aisha@gmail.com',
  ];

  return sentences.join('<br/>');
};

const swaggerConfig = new DocumentBuilder()
  .setTitle('Renglish API Swagger')
  .setDescription('The renglish application API description')
  .setVersion('1.0')
  .setDescription(formatDescription())
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Enter your JWT token',
    },
    'token',
  )
  .addSecurityRequirements('token')
  .build();

export default swaggerConfig;
