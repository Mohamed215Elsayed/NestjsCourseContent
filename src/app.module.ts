import { ClassSerializerInterceptor, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
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
import { CommonModule } from './common/common.module';
import { LoggerMiddleware, LoggerMiddlewareFn } from './common/middlewares/logger/logger.middleware';
import { UsersController } from './users/users.controller';

@Module({
  imports: [UsersModule, BatteryModule, EngineModule, CarModule, ConditionerModule, CommonModule], //meta module data that nestjs uses to organize the application structure
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
      provide: APP_INTERCEPTOR,
      useClass: WrapDataInterceptor
    }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    /******************************** */
    consumer
    .apply(LoggerMiddleware,LoggerMiddlewareFn)//i add class and fn
    .exclude(
      { path: 'api/v1/users/:id', method: RequestMethod.PATCH },
      { path: 'api/v1/users/:id', method: RequestMethod.DELETE }
    )
    .forRoutes(UsersController);
    // .forRoutes('api/v1/users');
    /******************************** */
    //consumer.apply(LoggerMiddleware).forRoutes('users/*');
    //Route Wildcards /users or /users/1 or/users/anything
    /******************************** */
    /*  consumer
      .apply(LoggerMiddleware)
      .exclude('users/login')//Excluding Routes
      .forRoutes('users'); */
    //✔ هيشتغل على كل users ماعدا /users/login
    /******************************** */
    // .apply(Middleware1, Middleware2)//تضيف أكتر من middleware ,✔ الترتيب مهم:
    /******************************** */
    // consumer.apply(LoggerMiddleware).forRoutes('*');
    /*🌍 9. Global Middleware
لو عايزه يشتغل على كل routes:
*/
    /******************************** */
    // consumer
    // .apply(LoggerMiddleware)
    // .forRoutes({ path: 'api/v1/users', method: RequestMethod.GET });
    /*
       forRoutes({
      path: 'abcd/*splat',
       path: 'abcd/{*splat}'
      method: RequestMethod.ALL,
    });
    ✔ Matches:
    abcd/1
    abcd/xyz
    abcd/anything
    ❌ لا يشمل:
    abcd فقط
    */
    /*
    🔥 الحل:
 path: 'abcd/{*splat}'
 ✔ كده يشمل:
 abcd
 abcd/anything
 👉 دي subtle جدًا وبتفرق في production
 */
    /******************************** */
    /* consumer
  .apply(LoggerMiddleware)
  .exclude(
    { path: 'api/v1/users', method: RequestMethod.GET },
    'api/v1/users/{*splat}',
  )
  .forRoutes(UsersController);
 */
  }
}
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
