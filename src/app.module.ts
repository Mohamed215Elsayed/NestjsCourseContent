import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BatteryModule } from './battery/battery.module';
import { EngineModule } from './engine/engine.module';
import { CarModule } from './car/car.module';
import { ConditionerModule } from './conditioner/conditioner.module';
import { APP_FILTER, APP_INTERCEPTOR, Reflector } from '@nestjs/core';
import { WrapDataInterceptor } from './common/interceptors/wrap-data/wrap-data.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout/timeout.interceptor';
import { GlobalExceptionFilter } from './common/filters/http-exception/http-exception.filter';

@Module({
  imports: [UsersModule, BatteryModule, EngineModule, CarModule, ConditionerModule], //meta module data that nestjs uses to organize the application structure
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    /* {
      provide:APP_INTERCEPTOR,
      useClass:ClassSerializerInterceptor
    } */
      {
        provide: APP_INTERCEPTOR,
        useFactory: (reflector: Reflector) => {
          return new ClassSerializerInterceptor(reflector);
        },
        inject: [Reflector],
      },
     /*  {
        provide: APP_FILTER,
        useClass: GlobalExceptionFilter,
      }, */
      {
        provide:APP_INTERCEPTOR,
        useClass: WrapDataInterceptor
      }
  ],
})
export class AppModule {}
/*
🧠 ليه ده مهم؟
Reflector هو اللي:
بيقرأ metadata من @Expose و @Exclude
بيخلي class-transformer يشتغل صح
بدونه → أنت فعليًا مش ضامن الـ serialization
🔥 الخلاصة
❌ useClass → شغال بس مش مضمون
✅ useFactory + Reflector → الصح والـ best practice
*/
