/**
 * 请求上下文中间件
 *
 * @description
 * 为每个 HTTP 请求创建和管理 RequestContext，确保在整个请求生命周期中
 * 可访问当前的租户、用户、组织等上下文信息。
 * 使用 nestjs-cls 实现异步本地存储，支持异步操作。
 *
 * @package @oksai/core
 */

import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Request, Response, NextFunction } from 'express';
import { RequestContext } from './request-context';

/**
 * 请求上下文中间件
 *
 * @description
 * NestJS 中间件，负责为每个请求创建 RequestContext 实例。
 * 通过 ClsService 管理上下文的生命周期，确保在异步操作中也能正确访问。
 */
@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  /**
   * 日志记录器
   */
  private readonly logger = new Logger(RequestContextMiddleware.name);

  /**
   * 日志启用标志
   */
  private readonly loggingEnabled = true;

  /**
   * CLS 服务
   */
  constructor(private readonly clsService: ClsService) {}

  /**
   * 中间件处理函数
   *
   * @description
   * 为每个请求创建 RequestContext 实例，并记录请求生命周期。
   *
   * @param req - HTTP 请求对象
   * @param res - HTTP 响应对象
   * @param next - 下一个中间件函数
   */
  use(req: Request, res: Response, next: NextFunction): void {
    // 使用 ClsService 启动新的上下文
    this.clsService.run(() => {
      // 从请求头获取关联 ID，如果没有则生成新的 UUID
      const correlationId = req.headers['x-correlation-id'] as string;
      const id = correlationId || crypto.randomUUID();

      // 创建请求上下文
      const context = new RequestContext({ id, req, res });
      this.clsService.set(RequestContext.name, context);

      // 构建完整的请求 URL
      const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

      // 记录请求开始（如果启用日志）
      if (this.loggingEnabled) {
        const contextId = RequestContext.getContextId();
        this.logger.log(`Context ${contextId}: ${req.method} request to ${fullUrl} started.`);
      }

      // 捕获原始的 res.end 函数
      const originalEnd = res.end.bind(res);

      // 重写 res.end 函数以记录响应完成
      res.end = (...args: any[]): Response => {
        if (this.loggingEnabled) {
          const contextId = RequestContext.getContextId();
          this.logger.log(
            `Context ${contextId}: ${req.method} request to ${fullUrl} completed with status ${res.statusCode}.`,
          );
        }

        // 调用原始的 res.end 并返回结果
        return originalEnd(...args);
      };

      next();
    });
  }
}
