/**
 * Jest 测试配置
 *
 * @description
 * 配置 Jest 测试框架，支持 TypeScript 和路径别名。
 *
 * @package @oksai/api
 */

import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from '../tsconfig.json';

/**
 * Jest 配置
 */
const config: Config = {
  /**
   * 预设：使用 ts-jest 处理 TypeScript
   */
  preset: 'ts-jest',

  /**
   * 测试环境
   */
  testEnvironment: 'node',

  /**
   * 模块文件扩展名
   */
  moduleFileExtensions: ['js', 'json', 'ts'],

  /**
   * 测试文件匹配模式
   */
  testRegex: '.*\\.spec\\.ts$',

  /**
   * TypeScript 转换配置
   */
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },

  /**
   * 收集覆盖率
   */
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/*.spec.ts',
    '!**/*.interface.ts',
    '!**/*.dto.ts',
    '!**/*.entity.ts',
    '!**/*.module.ts',
    '!**/main.ts',
    '!**/index.ts',
    '!**/node_modules/**',
    '!**/dist/**',
  ],

  /**
   * 覆盖率目录
   */
  coverageDirectory: './coverage',

  /**
   * 覆盖率报告格式
   */
  coverageReporters: ['text', 'lcov', 'html'],

  /**
   * 覆盖率阈值
   */
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  /**
   * 模块名称映射（支持路径别名）
   */
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/../..',
  }),

  /**
   * 模块路径
   */
  modulePaths: ['<rootDir>/../..'],

  /**
   * 根目录
   */
  rootDir: '.',

  /**
   * 测试路径忽略
   */
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],

  /**
   * 设置文件（测试前执行）
   */
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],

  /**
   * 全局设置
   */
  globals: {
    'ts-jest': {
      tsconfig: {
        ...compilerOptions,
        module: 'commonjs',
        types: ['node', 'jest'],
      },
    },
  },
};

export default config;
