/**
 * 配置服务
 *
 * @description
 * 提供应用配置的访问和管理功能。
 * 从环境配置对象中读取配置值。
 *
 * @package @oksai/config
 */

import { Injectable } from '@nestjs/common';
import { IEnvironment } from './environments/ienvironment';
import { environment } from './environments/environment';

/**
 * 配置服务类
 *
 * @description
 * 提供配置访问接口，封装环境配置对象。
 */
@Injectable()
export class ConfigService {
  /**
   * 环境配置对象
   *
   * @description
   * 从环境文件加载的配置对象。
   */
  private readonly config: IEnvironment = environment;

  /**
   * 获取环境配置对象
   *
   * @returns IEnvironment - 环境配置对象
   */
  getEnvironment(): IEnvironment {
    return this.config;
  }

  /**
   * 获取 API 端口
   *
   * @returns number - API 端口号
   */
  getPort(): number {
    return typeof this.config.port === 'string' ? parseInt(this.config.port, 10) : this.config.port;
  }

  /**
   * 获取 API 主机地址
   *
   * @returns string - API 主机地址
   */
  getHost(): string {
    return this.config.host;
  }

  /**
   * 获取 API 基础 URL
   *
   * @returns string - API 基础 URL
   */
  getBaseUrl(): string {
    return this.config.baseUrl;
  }

  /**
   * 判断是否为生产环境
   *
   * @returns boolean - 是否为生产环境
   */
  isProduction(): boolean {
    return this.config.production;
  }

  /**
   * 获取数据库配置
   *
   * @returns IDatabaseConfig - 数据库配置对象
   */
  getDatabaseConfig() {
    return this.config.database;
  }

  /**
   * 获取 JWT 配置
   *
   * @returns IJwtConfig - JWT 配置对象
   */
  getJwtConfig() {
    return {
      secret: this.config.JWT_SECRET,
      refreshSecret: this.config.JWT_REFRESH_TOKEN_SECRET,
      tokenExpirationTime: this.config.JWT_TOKEN_EXPIRATION_TIME,
      refreshTokenExpirationTime: this.config.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    };
  }

  /**
   * 获取 Redis 配置
   *
   * @returns IRedisConfig - Redis 配置对象
   */
  getRedisConfig() {
    return this.config.redis;
  }

  /**
   * 获取 OpenTelemetry 配置
   *
   * @returns IOtelConfig - OpenTelemetry 配置对象
   */
  getOtelConfig() {
    return this.config.otel;
  }

  /**
   * 获取 Sentry 配置
   *
   * @returns ISentryConfig - Sentry 配置对象
   */
  getSentryConfig() {
    return this.config.sentry;
  }

  /**
   * 获取 PostHog 配置
   *
   * @returns IPosthogConfig - PostHog 配置对象
   */
  getPosthogConfig() {
    return this.config.posthog;
  }
}
