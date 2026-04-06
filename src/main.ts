import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from './common/filters/custom-exception/custom-exception.filter';
// import { WrapDataInterceptor } from './common/interceptors/wrap-data/wrap-data.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { abortOnError: false });
//اي بلوك هنا لازم ميعتمدشي علي dependcies تانيه او بمعني اصح لايوجد في الكلاس بتاعها constructor
//طيب فيه constructor go to app.module.ts
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // يشيل أي field مش موجود في DTO
      forbidNonWhitelisted: true, // يرمي error لو فيه fields زيادة
      transform: true, // مهم لو بتتعامل مع types
      transformOptions: {
        enableImplicitConversion: true,//دي بتخلي Nest يحوّل الأنواع تلقائيًا بناءً على الـ DTO
      }
    }));
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  // app.useGlobalInterceptors(new WrapDataInterceptor());
  app.useGlobalFilters(new CustomExceptionFilter())//for HttpException only , new layer for Http only
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
