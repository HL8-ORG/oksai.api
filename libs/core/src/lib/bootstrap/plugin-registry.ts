/**
 * 插件注册表
 *
 * @description
 * 管理插件的注册和配置。
 * 提供插件实体、订阅者的注册功能。
 *
 * @package @oksai/core
 */

import { Type } from '@nestjs/common';
import { ApplicationPluginConfig } from '@oksai/common';

/**
 * 从插件配置中获取实体列表
 *
 * @description
 * 遍历所有插件，收集它们提供的实体。
 *
 * @param config - 应用插件配置
 * @returns Type<any>[] - 实体类型数组
 */
export function getEntitiesFromPlugins(
  config: Partial<ApplicationPluginConfig>,
): Type<unknown>[] {
  const entities: Type<unknown>[] = [];

  if (!config.plugins) {
    return entities;
  }

  for (const plugin of config.plugins) {
    // 如果插件是类且实现了 IPlugin 接口
    if (typeof plugin === 'function') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
      const pluginInstance = new (plugin as new () => { getEntities?: () => Type<unknown>[] })();
      if (
        pluginInstance &&
        pluginInstance.getEntities &&
        // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
        typeof pluginInstance.getEntities === 'function'
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
        const pluginEntities = pluginInstance.getEntities();
        if (Array.isArray(pluginEntities)) {
          entities.push(...pluginEntities);
        }
      }
    }
  }

  return entities;
}

/**
 * 从插件配置中获取订阅者列表
 *
 * @description
 * 遍历所有插件，收集它们提供的订阅者。
 *
 * @param config - 应用插件配置
 * @returns Type<unknown>[] - 订阅者类型数组
 */
export function getSubscribersFromPlugins(
  config: Partial<ApplicationPluginConfig>,
): Type<unknown>[] {
  const subscribers: Type<unknown>[] = [];

  if (!config.plugins) {
    return subscribers;
  }

  for (const plugin of config.plugins) {
    // 如果插件是类且实现了 IPlugin 接口
    if (typeof plugin === 'function') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
      const pluginInstance = new (plugin as new () => { getSubscribers?: () => Type<unknown>[] })();
      if (
        pluginInstance &&
        pluginInstance.getSubscribers &&
        // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
        typeof pluginInstance.getSubscribers === 'function'
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
        const pluginSubscribers = pluginInstance.getSubscribers();
        if (Array.isArray(pluginSubscribers)) {
          subscribers.push(...pluginSubscribers);
        }
      }
    }
  }

  return subscribers;
}

/**
 * 从插件配置中获取配置函数列表
 *
 * @description
 * 遍历所有插件，收集它们的配置函数。
 *
 * @param plugins - 插件列表
 * @returns ApplicationPluginConfigurationFn[] - 配置函数数组
 */
export function getPluginConfigurations(
  plugins?: Array<unknown>,
): Array<(config: ApplicationPluginConfig) => ApplicationPluginConfig | Promise<ApplicationPluginConfig>> {
  const configurations: Array<
    (config: ApplicationPluginConfig) => ApplicationPluginConfig | Promise<ApplicationPluginConfig>
  > = [];

  if (!plugins) {
    return configurations;
  }

  for (const plugin of plugins) {
    // 如果插件是类且实现了 IPlugin 接口
    if (typeof plugin === 'function') {
      const pluginInstance = new (plugin as new () => { configure?: () => (config: ApplicationPluginConfig) => ApplicationPluginConfig | Promise<ApplicationPluginConfig> })();
      if (
        pluginInstance &&
        pluginInstance.configure &&
        // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
        typeof pluginInstance.configure === 'function'
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
        const configureFn = pluginInstance.configure();
        if (configureFn && typeof configureFn === 'function') {
          configurations.push(configureFn);
        }
      }
    }
  }

  return configurations;
}
