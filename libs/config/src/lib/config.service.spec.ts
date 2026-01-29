/**
 * ConfigService 单元测试
 *
 * @description
 * 测试配置服务的功能。
 *
 * @package @oksai/config
 */

import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService],
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });

  it('应该被定义', () => {
    expect(service).toBeDefined();
  });

  describe('getEnvironment', () => {
    it('应该返回环境配置对象', () => {
      const env = service.getEnvironment();
      expect(env).toBeDefined();
      expect(env).toHaveProperty('port');
      expect(env).toHaveProperty('host');
      expect(env).toHaveProperty('baseUrl');
    });
  });

  describe('getPort', () => {
    it('应该返回端口号', () => {
      const port = service.getPort();
      expect(port).toBeDefined();
      expect(typeof port).toBe('number');
      expect(port).toBeGreaterThan(0);
    });
  });

  describe('getHost', () => {
    it('应该返回主机地址', () => {
      const host = service.getHost();
      expect(host).toBeDefined();
      expect(typeof host).toBe('string');
    });
  });

  describe('getBaseUrl', () => {
    it('应该返回基础 URL', () => {
      const baseUrl = service.getBaseUrl();
      expect(baseUrl).toBeDefined();
      expect(typeof baseUrl).toBe('string');
      expect(baseUrl).toMatch(/^https?:\/\//);
    });
  });

  describe('isProduction', () => {
    it('应该返回是否为生产环境', () => {
      const isProd = service.isProduction();
      expect(typeof isProd).toBe('boolean');
    });
  });

  describe('getDatabaseConfig', () => {
    it('应该返回数据库配置', () => {
      const dbConfig = service.getDatabaseConfig();
      expect(dbConfig).toBeDefined();
      expect(dbConfig).toHaveProperty('host');
      expect(dbConfig).toHaveProperty('port');
      expect(dbConfig).toHaveProperty('name');
      expect(dbConfig).toHaveProperty('user');
    });
  });

  describe('getJwtConfig', () => {
    it('应该返回 JWT 配置', () => {
      const jwtConfig = service.getJwtConfig();
      expect(jwtConfig).toBeDefined();
      expect(jwtConfig).toHaveProperty('secret');
      expect(jwtConfig).toHaveProperty('refreshSecret');
      expect(jwtConfig).toHaveProperty('tokenExpirationTime');
      expect(jwtConfig).toHaveProperty('refreshTokenExpirationTime');
    });
  });

  describe('getRedisConfig', () => {
    it('应该返回 Redis 配置', () => {
      const redisConfig = service.getRedisConfig();
      expect(redisConfig).toBeDefined();
      expect(redisConfig).toHaveProperty('url');
    });
  });
});
