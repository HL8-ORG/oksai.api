/**
 * 数据库配置
 *
 * @description
 * 从环境变量生成 MikroORM 连接配置。
 * 当前仅支持 PostgreSQL 和 MikroORM。
 *
 * @package @oksai/core
 */

import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver, Options as MikroOrmPostgreSqlOptions } from '@mikro-orm/postgresql';
import { EntityCaseNamingStrategy } from '@mikro-orm/core';
import { ConfigService } from '@oksai/config';

/**
 * 创建 MikroORM 连接配置
 *
 * @description
 * 从配置服务读取数据库配置，生成 MikroORM 连接选项。
 * 当前仅支持 PostgreSQL。
 *
 * @param configService - 配置服务实例
 * @param entities - 实体类数组
 * @returns MikroOrmModuleOptions - MikroORM 模块选项
 */
export function createMikroOrmConfig(
  configService: ConfigService,
  entities: any[] = [],
): MikroOrmModuleOptions {
  const dbConfig = configService.getDatabaseConfig();

  if (!dbConfig) {
    throw new Error('数据库配置未找到');
  }

  /**
   * PostgreSQL 数据库配置
   */
  const mikroOrmPostgreSqlOptions: MikroOrmPostgreSqlOptions = {
    /**
     * PostgreSQL 驱动
     */
    driver: PostgreSqlDriver,

    /**
     * 数据库主机地址
     */
    host: dbConfig.host,

    /**
     * 数据库端口
     */
    port: dbConfig.port,

    /**
     * 数据库名称
     */
    dbName: dbConfig.name,

    /**
     * 数据库用户名
     */
    user: dbConfig.user,

    /**
     * 数据库密码
     */
    password: dbConfig.password,

    /**
     * 迁移文件路径
     */
    migrations: {
      path: 'dist/libs/core/src/lib/database/migrations',
      pathTs: 'libs/core/src/lib/database/migrations',
      glob: '!(*.d).{js,ts}',
    },

    /**
     * 实体文件路径
     */
    entities: entities,

    /**
     * 驱动特定的连接选项
     */
    driverOptions: {
      /**
       * SSL/TLS 连接选项（可选）
       */
      connection: {
        ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
      },
    },

    /**
     * 连接池配置
     */
    pool: {
      /**
       * 最小连接数
       */
      min: 0,

      /**
       * 最大连接数
       */
      max: parseInt(process.env.DB_POOL_SIZE || '10', 10),
    },

    /**
     * 持久化（自动保存到数据库）
     */
    persistOnCreate: true,

    /**
     * 实体命名策略（下划线命名）
     */
    namingStrategy: EntityCaseNamingStrategy,

    /**
     * 调试模式
     */
    debug: process.env.DB_LOGGING === 'true' || process.env.NODE_ENV === 'development',

  };

  return mikroOrmPostgreSqlOptions;
}
