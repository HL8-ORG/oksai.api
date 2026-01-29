/**
 * 事件总线模块
 *
 * @description
 * 提供事件总线服务的 NestJS 模块。
 *
 * @package @oksai/core
 */

import { Module } from '@nestjs/common';
import { EventBus } from './event-bus';

/**
 * 事件总线模块
 *
 * @description
 * 全局模块，提供事件总线服务。
 */
@Module({
  providers: [EventBus],
  exports: [EventBus],
})
export class EventBusModule {}
