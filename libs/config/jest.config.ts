/**
 * Jest 测试配置 - Config 包
 *
 * @description
 * 配置 Jest 测试框架，支持 TypeScript 和路径别名。
 *
 * @package @oksai/config
 */

import type { Config } from 'jest';

/**
 * Jest 配置
 */
const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/*.spec.ts',
    '!**/*.interface.ts',
    '!**/index.ts',
    '!**/node_modules/**',
    '!**/dist/**',
  ],
  coverageDirectory: './coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  rootDir: 'src',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};

export default config;
