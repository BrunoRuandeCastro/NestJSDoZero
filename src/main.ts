import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    //ativa a lista permitida
    whitelist: true,
    //nao vai deixar enviar o que não está na whitelist
    forbidNonWhitelisted: true,
    //vai tipar o objeto com o tipo do top
    transform: true,

  }));

  await app.listen(3000);
}

bootstrap();
