/**
 * Oksai API 主入口文件
 *
 * 本文件是 Oksai API 的启动入口，负责：
 * 1. 加载环境变量
 * 2. 初始化核心模块
 * 3. 启动 NestJS 应用
 *
 * @package @oksai/api
 * @description Oksai API 主应用
 */

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { loadEnv } from '@oksai/config';
import { setupSwagger } from '@oksai/core';
import * as chalk from 'chalk';

/**
 * 加载环境变量
 *
 * @description
 * 从 .env 文件中加载环境变量
 */
// eslint-disable-next-line no-console
console.log(chalk.blue('Loading Environment Variables...'));
loadEnv();
// eslint-disable-next-line no-console
console.log(chalk.green('✓ Environment Variables Loaded'));

/**
 * 启动应用
 *
 * @description
 * 创建并启动 NestJS 应用，配置全局中间件和选项
 */
async function bootstrap() {
  // eslint-disable-next-line no-console
  console.time(chalk.yellow('✔ Application Startup Time'));

  // 创建 NestJS 应用实例
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // 启用关闭钩子
  app.enableShutdownHooks();

  // 全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 自动移除未定义的属性
      forbidNonWhitelisted: true, // 禁止未定义的属性
      transform: true, // 自动转换类型
      transformOptions: {
        enableImplicitConversion: true, // 启用隐式类型转换
      },
    }),
  );

  // 配置 Swagger 文档
  setupSwagger(app, {
    title: 'Oksai API',
    description: 'Oksai API 文档',
    version: '1.0.0',
    path: 'api/docs',
    enabled: process.env.NODE_ENV !== 'production',
  });

  // 获取配置
  const port = process.env.API_PORT ? parseInt(process.env.API_PORT, 10) : 3000;
  const host = process.env.API_HOST || '0.0.0.0';

  // 启动服务器
  await app.listen(port, host);

  // eslint-disable-next-line no-console
  console.timeEnd(chalk.yellow('✔ Application Startup Time'));
  // eslint-disable-next-line no-console
  console.log(chalk.green(`🚀 Application is running on: http://${host}:${port}`));
}

// 启动应用
bootstrap().catch((error) => {
  console.error(chalk.red('❌ Application failed to start:'), error);
  process.exit(1);
});
