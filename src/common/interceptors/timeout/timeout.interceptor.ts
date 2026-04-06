import { CallHandler, ExecutionContext, Injectable, NestInterceptor, RequestTimeoutException } from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    /* if (!req.headers['x-api-key']) {
      throw new RequestTimeoutException('Missing API Key'); // أو BadRequestException
    }
    req.customData = {
      startTime: Date.now(),
    };
    if (req.ip === '::1') {
      console.log('Local request');
    } */
    return next.handle().pipe(
      timeout(4000), // ⏱️ 4 ثواني
      catchError((err) =>{
        //check 
        if (err instanceof TimeoutError) {
          return throwError(()=> new RequestTimeoutException('Request timeout'));
        }
        return throwError(() => err);
      }),
    );
  }
}
