/**
 * GraphQL 模块
 *
 * @description
 * 提供 GraphQL API 功能。
 *
 * @package @oksai/core
 */

import { DynamicModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@oksai/config';
import { createGraphqlModuleOptions, GraphQLApiConfigurationOptions } from './graphql.config';

/**
 * GraphQL 模块
 *
 * @description
 * 提供 GraphQL API 功能。
 */
@Module({})
export class GraphqlCoreModule {
  /**
   * 异步注册 GraphQL 模块
   *
   * @description
   * 根据配置服务动态创建 GraphQL 模块。
   *
   * @param optionsFactory - 配置选项工厂函数
   * @returns DynamicModule - 动态模块配置
   */
  static registerAsync(
    optionsFactory: (configService: ConfigService) => GraphQLApiConfigurationOptions,
  ): DynamicModule {
    return GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async (configService: ConfigService) => {
        const options = optionsFactory(configService);
        return createGraphqlModuleOptions(configService, options);
      },
      inject: [ConfigService],
      imports: [],
    });
  }
}
