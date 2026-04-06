import { CallHandler, ExecutionContext,
    Injectable, NestInterceptor } from "@nestjs/common";
import { of } from "rxjs";

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const isCached = true;

    if (isCached) {
      return of({ data: 'cached data' });
    }

    return next.handle();
  }
}