/**
 * HTTP 异常过滤器
 *
 * @description
 * 全局异常过滤器，统一处理所有 HTTP 异常。
 * 将异常转换为统一的响应格式。
 *
 * @package @oksai/core
 */

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../interceptors/transform.interceptor';

/**
 * HTTP 异常过滤器
 *
 * @description
 * 捕获所有 HTTP 异常并转换为统一格式。
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * 捕获并处理异常
   *
   * @param exception - HTTP 异常
   * @param host - 参数主机
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // 构建统一响应格式
    const errorResponse: ApiResponse = {
      statusCode: status,
      message:
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message || exception.message,
      data: null,
      timestamp: new Date().toISOString(),
    };

    // 如果是对象类型的响应，添加详细信息
    if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      const responseObj = exceptionResponse as any;
      if (responseObj.message && Array.isArray(responseObj.message)) {
        errorResponse.message = responseObj.message.join(', ');
      }
    }

    response.status(status).json(errorResponse);
  }
}

/**
 * 全局异常过滤器
 *
 * @description
 * 捕获所有未处理的异常。
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  /**
   * 捕获并处理所有异常
   *
   * @param exception - 异常对象
   * @param host - 参数主机
   */
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    // 构建统一响应格式
    const errorResponse: ApiResponse = {
      statusCode: status,
      message: typeof message === 'string' ? message : (message as any).message || 'Internal server error',
      data: null,
      timestamp: new Date().toISOString(),
    };

    response.status(status).json(errorResponse);
  }
}
