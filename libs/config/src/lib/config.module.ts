/**
 * 配置模块
 *
 * @description
 * 本模块提供全局配置管理功能，包括：
 * 1. 应用配置管理
 * 2. 环境变量处理
 * 3. 配置服务提供
 *
 * @package @oksai/config
 * @module 配置模块
 */

import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';

/**
 * 配置模块
 *
 * @description
 * 全局模块，提供配置服务。
 * 使用 @Global() 装饰器使配置服务在整个应用中可用。
 */
@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {
  /**
   * 配置模块的静态方法，用于注册配置模块
   *
   * @description
   * 提供 forRoot 方法以保持与 NestJS 模块注册模式的一致性。
   * 当前实现中，配置模块已经是全局的，此方法主要用于兼容性。
   *
   * @returns DynamicModule - 动态模块配置
   */
  static forRoot(): DynamicModule {
    return {
      module: ConfigModule,
      providers: [ConfigService],
      exports: [ConfigService],
      global: true,
    };
  }
}
