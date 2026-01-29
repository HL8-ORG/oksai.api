/**
 * GraphQL 配置
 *
 * @description
 * GraphQL API 配置选项接口和工具函数。
 *
 * @package @oksai/core
 */

import { ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@oksai/config';

/**
 * GraphQL API 配置选项
 */
export interface GraphQLApiConfigurationOptions {
  /**
   * GraphQL 路径
   */
  path?: string;

  /**
   * 是否启用 Playground
   */
  playground?: boolean;

  /**
   * 是否启用调试
   */
  debug?: boolean;
}

/**
 * 创建 GraphQL 模块选项
 *
 * @description
 * 根据配置服务创建 GraphQL 模块选项。
 *
 * @param configService - 配置服务
 * @param options - GraphQL API 配置选项
 * @returns ApolloDriverConfig - GraphQL 驱动配置
 */
export function createGraphqlModuleOptions(
  _configService: ConfigService,
  options: GraphQLApiConfigurationOptions = {},
): ApolloDriverConfig {
  const {
    path = '/graphql',
    playground = process.env.NODE_ENV !== 'production',
    debug = process.env.NODE_ENV !== 'production',
  } = options;

  return {
    /**
     * GraphQL 路径
     */
    path,

    /**
     * 是否启用 Playground
     */
    playground,

    /**
     * 是否启用调试
     */
    debug,

    /**
     * 自动生成 Schema 文件
     */
    autoSchemaFile: true,

    /**
     * 排序 Schema
     */
    sortSchema: true,

    /**
     * 上下文函数
     */
    context: ({ req }: { req: any }) => ({ req }),

    /**
     * 格式化错误
     */
    formatError: (error) => {
      return {
        message: error.message,
        code: error.extensions?.code,
        path: error.path,
      };
    },
  };
}
