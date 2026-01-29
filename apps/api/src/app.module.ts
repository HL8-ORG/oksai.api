/**
 * 应用根模块
 *
 * @description
 * 这是应用的根模块，负责导入和配置所有其他模块。
 * 当前集成了核心基础设施模块。
 *
 * @module AppModule
 */

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@oksai/config';
import {
  DatabaseModule,
  EventBusModule,
  CqrsModule,
  ContextModule,
  RequestContextMiddleware,
  TransformInterceptor,
  AllExceptionsFilter,
  ValidationPipe,
} from '@oksai/core';
import { AuthModule } from './modules/auth/auth.module';

/**
 * 应用根模块
 *
 * @description
 * 导入所有核心模块，配置全局中间件。
 */
@Module({
  imports: [
    // 配置模块（全局）
    ConfigModule.forRoot(),
    // 上下文模块（全局）
    ContextModule,
    // 数据库模块（全局）
    DatabaseModule,
    // 事件总线模块
    EventBusModule,
    // CQRS 模块
    CqrsModule,
    // 认证模块
    AuthModule,
  ],
  controllers: [],
  providers: [
    // 全局异常过滤器
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    // 全局响应拦截器
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    // 全局验证管道
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  /**
   * 配置中间件
   *
   * @description
   * 为所有路由应用请求上下文中间件。
   *
   * @param consumer - 中间件消费者
   */
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}
