/**
 * 数据转换拦截器
 *
 * @description
 * NestJS 拦截器，用于统一转换响应数据格式。
 * 将 Controller 返回的实体对象转换为纯 JSON 对象，移除 ORM 特有的属性。
 *
 * @package @oksai/core
 */

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { instanceToPlain } from 'class-transformer';

/**
 * 统一响应格式接口
 */
export interface ApiResponse<T = any> {
  /**
   * 响应状态码
   */
  statusCode: number;

  /**
   * 响应消息
   */
  message?: string;

  /**
   * 响应数据
   */
  data?: T;

  /**
   * 时间戳
   */
  timestamp: string;
}

/**
 * 数据转换拦截器
 *
 * @description
 * 全局拦截器，拦截所有响应并应用转换。
 * 使用 class-transformer 的 instanceToPlain 方法将实体对象转换为纯对象。
 * 统一响应格式为 { statusCode, message, data, timestamp }。
 */
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  /**
   * 拦截响应并转换数据
   *
   * @param context - 执行上下文
   * @param next - 调用处理器
   * @returns Observable<ApiResponse> - 转换后的响应
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse> {
    return next.handle().pipe(
      map((data) => {
        // 如果已经是统一格式，直接返回
        if (data && typeof data === 'object' && 'statusCode' in data) {
          return data;
        }

        // 转换为纯对象
        const plainData = instanceToPlain(data);

        // 返回统一格式
        return {
          statusCode: context.switchToHttp().getResponse().statusCode || 200,
          message: 'success',
          data: plainData,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
