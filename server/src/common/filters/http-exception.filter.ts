import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;
    const errorResponse = exception.getResponse();

    const errorLog = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      errorMessage:
        errorResponse["message"] ||
        exception.message ||
        "Internal Server Error",
      stack: exception.stack,
    };

    this.logger.error(
      `❌ [${errorLog.method}] ${errorLog.path} 에러 발생!`,
      JSON.stringify(errorLog, null, 2)
    );

    response.status(status).json({
      statusCode: status,
      timestamp: errorLog.timestamp,
      path: errorLog.path,
      message: errorLog.errorMessage,
    });
  }
}
