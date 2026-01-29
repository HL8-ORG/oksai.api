/**
 * 环境变量加载工具模块
 *
 * 本模块提供从 .env 文件加载环境变量的功能，支持：
 * 1. 从指定路径加载环境变量
 * 2. 加载 .env 和 .env.local 文件
 * 3. 支持覆盖模式
 *
 * @package @oksai/config
 * @module 环境变量加载工具
 */

import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

/**
 * 从指定文件加载环境变量
 *
 * @description
 * 使用 dotenv 库从指定的 .env 文件中加载环境变量。
 * 支持覆盖现有环境变量和静默模式。
 *
 * @param envPath - .env 文件的绝对路径
 * @param options - dotenv 配置选项
 * @param options.override - 是否覆盖现有环境变量，默认为 false
 * @param options.quiet - 是否静默模式（不输出警告），默认为 false
 *
 * @example
 * ```typescript
 * // 加载 .env 文件，覆盖现有环境变量
 * loadEnvFile('/path/to/.env', { override: true });
 *
 * // 加载 .env.local 文件，不覆盖现有环境变量
 * loadEnvFile('/path/to/.env.local');
 * ```
 */
export function loadEnvFile(
  envPath: string,
  options: { override?: boolean; quiet?: boolean } = {},
): void {
  if (fs.existsSync(envPath)) {
    /**
     * 开始加载环境变量并计时
     */
    console.time(`✔ Load ${path.basename(envPath)} Time`);
    console.log(
      `Loading environment variables from: ${envPath}${options.override ? ' (override)' : ''}`,
    );

    /**
     * 使用 dotenv 加载环境变量
     * - quiet: true - 不输出警告信息
     * - override: 是否覆盖现有环境变量
     */
    dotenv.config({ path: envPath, quiet: true, ...options });

    /**
     * 停止加载计时
     */
    console.timeEnd(`✔ Load ${path.basename(envPath)} Time`);
  }
}

/**
 * 从 .env 和 .env.local 文件加载环境变量
 *
 * @description
 * 本函数按以下顺序加载环境变量：
 * 1. 先加载 .env 文件，覆盖现有环境变量
 * 2. 再加载 .env.local 文件，不覆盖已加载的环境变量
 *
 * 加载顺序说明：
 * - .env：基础环境变量配置，用于所有环境
 * - .env.local：本地开发环境配置，用于覆盖 .env 中的配置
 *
 * @example
 * ```typescript
 * // 加载所有环境变量
 * loadEnv();
 * ```
 */
export function loadEnv(): void {
  /**
   * 获取当前工作目录
   */
  const currentDir = process.cwd();
  console.log('Current API Directory:', currentDir);

  /**
   * 定义环境文件路径
   * - env：.env 文件的绝对路径
   * - envLocal：.env.local 文件的绝对路径
   */
  const envPaths = {
    env: path.resolve(currentDir, '.env'),
    envLocal: path.resolve(currentDir, '.env.local'),
  };

  /**
   * 输出环境文件路径信息
   */
  console.log(
    `API Environment Paths: .env -> ${envPaths.env}, .env.local -> ${envPaths.envLocal}`,
  );

  /**
   * 加载 .env 文件，覆盖现有环境变量
   *
   * 这确保 .env 中的基础配置优先加载
   */
  loadEnvFile(envPaths.env, { override: true });

  /**
   * 加载 .env.local 文件，不覆盖已存在的环境变量
   *
   * .env.local 用于本地开发环境，只添加新的环境变量
   */
  loadEnvFile(envPaths.envLocal);
}
