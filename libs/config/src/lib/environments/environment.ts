/**
 * 环境配置对象
 *
 * @description
 * 从环境变量加载并构建应用配置对象。
 * 根据 NODE_ENV 环境变量决定使用开发或生产配置。
 *
 * @package @oksai/config
 */

import * as dotenv from 'dotenv';
import { IEnvironment } from './ienvironment';

/**
 * 加载环境变量
 * 优先加载 .env 文件，然后加载 .env.local（如果存在）
 */
dotenv.config({ quiet: true });

/**
 * 判断是否为生产环境
 */
const isProduction = process.env.NODE_ENV === 'production';

/**
 * 应用环境配置对象
 */
export const environment: IEnvironment = {
  port: process.env.API_PORT || 3000,
  host: process.env.API_HOST || '0.0.0.0',
  baseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
  clientBaseUrl: process.env.CLIENT_BASE_URL || 'http://localhost:4200',
  production: isProduction,
  envName: isProduction ? 'prod' : 'dev',

  env: {
    LOG_LEVEL: (process.env.LOG_LEVEL as any) || 'debug',
  },

  EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET || 'oksai-session-secret',
  USER_PASSWORD_BCRYPT_SALT_ROUNDS: parseInt(process.env.USER_PASSWORD_BCRYPT_SALT_ROUNDS || '12', 10),

  JWT_SECRET: process.env.JWT_SECRET || 'secretKey',
  JWT_TOKEN_EXPIRATION_TIME:
    parseInt(process.env.JWT_TOKEN_EXPIRATION_TIME || '86400', 10) || 86400, // 默认 1 天

  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET || 'refreshSecretKey',
  JWT_REFRESH_TOKEN_EXPIRATION_TIME:
    parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME || '604800', 10) || 604800, // 默认 7 天

  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    name: process.env.DB_NAME || 'oksai',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    orm: (process.env.DB_ORM as 'mikro-orm' | 'typeorm') || 'mikro-orm',
  },

  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  },

  otel: {
    enabled: process.env.OTEL_ENABLED === 'true',
    provider: (process.env.OTEL_PROVIDER as 'jaeger' | 'honeycomb' | 'aspecto') || 'jaeger',
    tracesEndpoint:
      process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT || 'http://localhost:14268/api/traces',
    serviceName: process.env.OTEL_SERVICE_NAME || 'oksai-api',
  },

  sentry: {
    dsn: process.env.SENTRY_DSN,
  },

  posthog: {
    key: process.env.POSTHOG_KEY,
    host: process.env.POSTHOG_HOST || 'https://app.posthog.com',
    enabled: process.env.POSTHOG_ENABLED === 'true',
  },
};
