/**
 * Jest 测试设置文件
 *
 * @description
 * 在运行测试之前执行的设置代码。
 *
 * @package @oksai/api
 */

/// <reference types="jest" />

/**
 * 设置测试超时时间（30 秒）
 */
jest.setTimeout(30000);

/**
 * 模拟环境变量
 */
process.env.NODE_ENV = 'test';
process.env.API_PORT = '3000';
process.env.API_HOST = '0.0.0.0';
process.env.DB_HOST = 'localhost';
process.env.DB_PORT = '5432';
process.env.DB_NAME = 'oksai_test';
process.env.DB_USER = 'postgres';
process.env.DB_PASSWORD = 'password';
process.env.JWT_SECRET = 'test-secret-key';
process.env.JWT_REFRESH_TOKEN_SECRET = 'test-refresh-secret-key';
