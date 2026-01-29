/**
 * 数据库模块
 *
 * @description
 * 提供数据库连接和配置功能。
 * 当前仅支持 MikroORM 和 PostgreSQL。
 *
 * @package @oksai/core
 * @module 数据库模块
 */

import { Global, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService } from '@oksai/config';
import { createMikroOrmConfig } from './database.config';

/**
 * 数据库模块
 *
 * @description
 * 全局模块，提供 MikroORM 数据库连接。
 * 使用异步配置从 ConfigService 读取数据库配置。
 */
@Global()
@Module({
  imports: [
    /**
     * MikroORM 模块配置
     *
     * @description
     * 使用异步工厂函数从 ConfigService 获取数据库配置。
     * 实体列表将在后续阶段通过插件系统动态注册。
     */
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        /**
         * 当前实体列表为空，后续将通过插件系统注册实体
         */
        return createMikroOrmConfig(configService, []);
      },
    }),
  ],
  exports: [MikroOrmModule],
})
export class DatabaseModule {}
