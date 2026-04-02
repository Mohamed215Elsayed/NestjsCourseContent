import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { abortOnError: false });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // يشيل أي field مش موجود في DTO
      forbidNonWhitelisted: true, // يرمي error لو فيه fields زيادة
      transform: true, // مهم لو بتتعامل مع types
    }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
