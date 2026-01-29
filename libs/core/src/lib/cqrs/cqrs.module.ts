/**
 * CQRS 模块
 *
 * @description
 * 提供 CQRS（命令查询职责分离）模式的 NestJS 模块。
 * 集成 @nestjs/cqrs 模块，提供 Command 和 Query 基础设施。
 *
 * @package @oksai/core
 */

import { Module } from '@nestjs/common';
import { CqrsModule as NestCqrsModule } from '@nestjs/cqrs';

/**
 * CQRS 模块
 *
 * @description
 * 全局模块，提供 CQRS 功能。
 * 导出 NestJS CQRS 模块，供其他模块使用。
 */
@Module({
  imports: [NestCqrsModule],
  exports: [NestCqrsModule],
})
export class CqrsModule {}
