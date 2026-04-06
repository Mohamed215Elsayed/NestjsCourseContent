import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter<T> implements ExceptionFilter {
  // catch(exception: T, host: ArgumentsHost) {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal server error';

    // ✅ لو HttpException
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    }
    // ✅ لو error عادي فيه statusCode
    else if (
      typeof exception === 'object' &&
      exception !== null &&
      'statusCode' in exception
    ) {
      status = (exception as any).statusCode;
      message = (exception as any).message;
    }
    // ❌ fallback
    else if (exception instanceof Error) {
      message = exception.message;
    }
    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });

  }
}
