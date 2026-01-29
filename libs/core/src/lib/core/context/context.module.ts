/**
 * 上下文模块
 *
 * @description
 * 提供请求上下文管理的 NestJS 模块。
 * 集成 nestjs-cls 实现异步本地存储。
 *
 * @package @oksai/core
 */

import { Global, Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { RequestContext } from './request-context';
import { RequestContextMiddleware } from './request-context.middleware';

/**
 * 上下文模块
 *
 * @description
 * 全局模块，提供请求上下文管理功能。
 */
@Global()
@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: false, // 手动挂载中间件
      },
    }),
  ],
  providers: [RequestContextMiddleware],
  exports: [ClsModule, RequestContextMiddleware],
})
export class ContextModule {
  /**
   * 构造函数
   *
   * @description
   * 初始化时设置 RequestContext 的 CLS 服务。
   */
  constructor(private readonly clsService: any) {
    // 设置 RequestContext 的 CLS 服务
    RequestContext.setClsService(this.clsService);
  }
}
