import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class MyInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        const now = Date.now();//1. Logging Interceptor
        // قبل
        console.log('Before');
        console.log(req.url)// /api/v1/users

        return next.handle().pipe(
            // بعد
            tap(() =>{
                // console.log('After')
                // console.log(res.url)
                console.log(`After... ${Date.now() - now}ms`)//After...9ms

            }),
        );
        /* return next.handle().pipe(
            map((data) => ({
              success: true,
              data,
            })),
          ); */
    }
}
/**************/
/*
ExecutionContext
ده بيديك معلومات عن:

request
response
handler
*/

/*
CallHandler
next.handle()

⚠️ دي أهم نقطة:

لو مستدعيتش handle()
→ ال controller مش هيشتغل ❌
لو استدعيتها
→ يكمل عادي ✅
*/