/**
 * 环境配置接口定义
 *
 * @description
 * 定义应用环境配置的接口，包含所有可配置项。
 *
 * @package @oksai/config
 */

/**
 * 日志级别类型
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'verbose';

/**
 * 环境变量对象
 */
export interface Env {
  LOG_LEVEL?: LogLevel;
  [key: string]: string | undefined;
}

/**
 * 数据库配置接口
 */
export interface IDatabaseConfig {
  host: string;
  port: number;
  name: string;
  user: string;
  password: string;
  orm: 'mikro-orm' | 'typeorm';
}

/**
 * JWT 配置接口
 */
export interface IJwtConfig {
  secret: string;
  refreshSecret: string;
  tokenExpirationTime: number;
  refreshTokenExpirationTime: number;
}

/**
 * Redis 配置接口
 */
export interface IRedisConfig {
  url: string;
}

/**
 * OpenTelemetry 配置接口
 */
export interface IOtelConfig {
  enabled: boolean;
  provider?: 'jaeger' | 'honeycomb' | 'aspecto';
  tracesEndpoint?: string;
  serviceName?: string;
}

/**
 * Sentry 配置接口
 */
export interface ISentryConfig {
  dsn?: string;
}

/**
 * PostHog 配置接口
 */
export interface IPosthogConfig {
  key?: string;
  host?: string;
  enabled: boolean;
}

/**
 * 应用环境配置接口
 */
export interface IEnvironment {
  /** API 端口 */
  port: number | string;
  /** API 主机地址 */
  host: string;
  /** API 基础 URL */
  baseUrl: string;
  /** 客户端基础 URL */
  clientBaseUrl?: string;

  /** 是否为生产环境 */
  production: boolean;
  /** 环境名称 */
  envName: string;

  /** 环境变量对象 */
  env?: Env;

  /** Express Session 密钥 */
  EXPRESS_SESSION_SECRET: string;
  /** 用户密码 Bcrypt 盐轮数 */
  USER_PASSWORD_BCRYPT_SALT_ROUNDS?: number;

  /** JWT 配置 */
  JWT_SECRET?: string;
  JWT_TOKEN_EXPIRATION_TIME?: number;
  JWT_REFRESH_TOKEN_SECRET?: string;
  JWT_REFRESH_TOKEN_EXPIRATION_TIME?: number;

  /** 数据库配置 */
  database?: IDatabaseConfig;

  /** Redis 配置 */
  redis?: IRedisConfig;

  /** OpenTelemetry 配置 */
  otel?: IOtelConfig;

  /** Sentry 配置 */
  sentry?: ISentryConfig;

  /** PostHog 配置 */
  posthog?: IPosthogConfig;
}
