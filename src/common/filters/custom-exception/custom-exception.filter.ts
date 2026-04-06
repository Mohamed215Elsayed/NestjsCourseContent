import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class CustomExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    //prepare errorResponse
    const exceptionResponse = exception.getResponse();//comes from service
    //add translate logic here...
    const error = typeof response === "string"
      ? { message: exceptionResponse }
      : (exceptionResponse as object);
    //use sentry to log errors
    //sentry.log(error)
    response.status(status)
      .json({
        ...error,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,

      });
  }
}
