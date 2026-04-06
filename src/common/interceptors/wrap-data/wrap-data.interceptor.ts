import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class WrapDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response= context.switchToHttp().getResponse();
   
    return next.handle().pipe(
      map((data) => ({ sussess: true,
        statusCode: response.statusCode, data })));
  }
}
