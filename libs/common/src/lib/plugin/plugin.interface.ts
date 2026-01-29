/**
 * 插件接口
 *
 * @description
 * 定义插件的基本接口。
 * 所有插件必须实现此接口。
 *
 * @package @oksai/common
 */

import { Type } from '@nestjs/common';

/**
 * 插件接口
 *
 * @description
 * 定义插件的基本结构，包括：
 * - 插件名称
 * - 插件版本
 * - 实体列表
 * - 订阅者列表
 */
export interface IPlugin {
  /**
   * 插件名称
   */
  name: string;

  /**
   * 插件版本
   */
  version?: string;

  /**
   * 插件提供的实体列表
   *
   * @description
   * 返回插件定义的所有实体类。
   */
  getEntities?(): Type<any>[];

  /**
   * 插件提供的订阅者列表
   *
   * @description
   * 返回插件定义的所有订阅者类。
   */
  getSubscribers?(): Type<any>[];

  /**
   * 插件配置函数
   *
   * @description
   * 用于配置插件的函数，接收应用配置并返回修改后的配置。
   */
  configure?(config: any): any | Promise<any>;
}
