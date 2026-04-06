import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

//Transform Response (مهم جدًا)
export class TransformInterceptor<T> implements NestInterceptor<T, { data: T }>
{
    intercept(context: ExecutionContext, next: CallHandler) {
        return next.handle().pipe(
          map((data) => ({ data })),
        );
      }
}