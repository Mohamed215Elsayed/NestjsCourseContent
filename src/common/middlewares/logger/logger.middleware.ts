import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

//✅ 1. Class-based Middleware (مع DI)
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  /*
  ميزته الأساسية:
بيدعم Dependency Injection
تقدر inject services جواه (مثلاً LoggerService أو DB أو Config)
بيتعامل كـ singleton (نسخة واحدة بس)
*/
// 👉 مثال عملي:
  // constructor(private readonly loggerService: LoggerService) {}//DI
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    console.log({
      method: req.method,
      url: req.url,
      time: new Date().toISOString(),
    });
    //add logic  here
    //الاستفاده من DI ,وانه يكون عندك نسخه واحده فقط من middleware
    next();
  }
}


//✅ 2. Functional Middleware (خفيف وسريع)
export const LoggerMiddlewareFn = (req: Request, res: Response, next: NextFunction) =>{
    console.log('fn Request...');
    next();
}
/*
ميزته:
بسيط جدًا
مناسب للحاجات الصغيرة (log / header check)
❌ مفيهوش DI
*/