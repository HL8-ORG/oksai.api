/**
 * Swagger 配置
 *
 * @description
 * 配置 Swagger API 文档。
 *
 * @package @oksai/core
 */

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Swagger 配置选项
 */
export interface SwaggerConfigOptions {
  /**
   * API 标题
   */
  title?: string;

  /**
   * API 描述
   */
  description?: string;

  /**
   * API 版本
   */
  version?: string;

  /**
   * API 路径
   */
  path?: string;

  /**
   * 是否启用
   */
  enabled?: boolean;
}

/**
 * 设置 Swagger 文档
 *
 * @description
 * 配置并启用 Swagger API 文档。
 *
 * @param app - NestJS 应用实例
 * @param options - Swagger 配置选项
 */
export function setupSwagger(
  app: INestApplication,
  options: SwaggerConfigOptions = {},
): void {
  const {
    title = 'Oksai API',
    description = 'Oksai API 文档',
    version = '1.0.0',
    path = 'api/docs',
    enabled = process.env.NODE_ENV !== 'production',
  } = options;

  if (!enabled) {
    return;
  }

  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: '输入 JWT Token',
        in: 'header',
      },
      'JWT-auth', // 这个名称用于在 @ApiBearerAuth() 装饰器中使用
    )
    .addTag('auth', '认证相关接口')
    .addTag('users', '用户管理接口')
    .addTag('tenants', '租户管理接口')
    .addTag('organizations', '组织管理接口')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(path, app, document, {
    swaggerOptions: {
      persistAuthorization: true, // 保持授权状态
    },
  });
}
