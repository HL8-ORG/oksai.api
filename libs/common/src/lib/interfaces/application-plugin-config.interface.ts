/**
 * 应用插件配置接口
 *
 * @description
 * 定义应用插件系统的配置接口。
 * 用于在应用启动时配置插件、实体、订阅者等。
 *
 * @package @oksai/common
 */

import { DynamicModule, Type } from '@nestjs/common';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';

/**
 * API 服务器配置选项
 */
export interface ApiServerConfigurationOptions {
  /**
   * API 服务器主机地址
   */
  host?: string;

  /**
   * API 服务器端口
   */
  port?: number;

  /**
   * API 基础 URL
   */
  baseUrl?: string;
}

/**
 * 应用插件配置
 *
 * @description
 * 定义应用启动时需要的所有配置选项，包括：
 * - API 配置
 * - 数据库配置
 * - 插件列表
 */
export interface ApplicationPluginConfig {
  /**
   * API 服务器配置选项
   */
  apiConfigOptions: ApiServerConfigurationOptions;

  /**
   * MikroORM 数据库连接选项
   */
  dbMikroOrmConnectionOptions: MikroOrmModuleOptions;

  /**
   * 插件列表
   *
   * @description
   * 动态模块或类类型的数组，表示要添加到应用的插件。
   */
  plugins?: Array<DynamicModule | Type<any>>;
}

/**
 * 插件配置函数类型
 *
 * @description
 * 用于配置应用插件的函数类型。
 * 接收 ApplicationPluginConfig 并返回修改后的配置。
 */
export type ApplicationPluginConfigurationFn = (
  config: ApplicationPluginConfig,
) => ApplicationPluginConfig | Promise<ApplicationPluginConfig>;
