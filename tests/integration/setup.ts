/**
 * 集成测试设置文件
 *
 * @description
 * 在运行集成测试之前执行的设置代码。
 *
 * @package @oksai/tests
 */

/**
 * 设置测试超时时间（30 秒）
 */
jest.setTimeout(30000);

/**
 * 配置测试环境变量
 */
process.env.NODE_ENV = 'test';
process.env.API_PORT = '3001';
process.env.API_HOST = '0.0.0.0';
process.env.DB_HOST = process.env.TEST_DB_HOST || 'localhost';
process.env.DB_PORT = process.env.TEST_DB_PORT || '5432';
process.env.DB_NAME = process.env.TEST_DB_NAME || 'oksai_test';
process.env.DB_USER = process.env.TEST_DB_USER || 'postgres';
process.env.DB_PASSWORD = process.env.TEST_DB_PASSWORD || 'password';
process.env.JWT_SECRET = 'test-jwt-secret-key';
process.env.JWT_REFRESH_TOKEN_SECRET = 'test-refresh-secret-key';
process.env.EXPRESS_SESSION_SECRET = 'test-session-secret';

/**
 * 全局测试清理
 */
afterAll(async () => {
  // 在这里可以添加全局清理逻辑，如关闭数据库连接等
});
