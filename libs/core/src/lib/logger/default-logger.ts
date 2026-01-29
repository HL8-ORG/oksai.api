/**
 * 默认日志服务实现
 *
 * @description
 * 基于 NestJS LoggerService 的默认日志实现。
 * 参考 ever-gauzy 的 DefaultLogger 实现。
 *
 * @package @oksai/core
 */

import { LoggerService } from '@nestjs/common';

/**
 * 默认上下文名称
 */
const DEFAULT_CONTEXT = 'Bootstrap Server';

/**
 * 默认日志服务类
 *
 * @description
 * 实现 NestJS LoggerService 接口，提供基础的日志功能。
 * 使用 console 输出日志，支持不同日志级别。
 */
export class DefaultLogger implements LoggerService {
  /**
   * 日志输出函数
   */
  logger = console.log;

  /**
   * 默认上下文
   */
  private _defaultContext = DEFAULT_CONTEXT;

  /**
   * 获取默认上下文
   */
  get defaultContext(): string {
    return this._defaultContext;
  }

  /**
   * 设置默认上下文
   */
  set defaultContext(context: string) {
    this._defaultContext = context;
  }

  /**
   * 构造函数
   *
   * @param _options - 日志选项（可选，保留用于未来扩展）
   */
  constructor(_options?: any) {}

  /**
   * 记录日志消息
   *
   * @param message - 日志消息
   * @param context - 上下文（可选）
   */
  log(message: any, context?: string): void {
    this.printLog('info', message, context);
  }

  /**
   * 记录错误消息
   *
   * @param message - 错误消息
   * @param context - 上下文（可选）
   * @param trace - 错误堆栈（可选）
   */
  error(message: string, context?: string, trace?: string | undefined): void {
    this.printLog('error', message, context);
    if (trace) {
      console.error(trace);
    }
  }

  /**
   * 记录警告消息
   *
   * @param message - 警告消息
   * @param context - 上下文（可选）
   */
  warn(message: string, context?: string): void {
    this.printLog('warn', message, context);
  }

  /**
   * 记录信息消息
   *
   * @param message - 信息消息
   * @param context - 上下文（可选）
   */
  info(message: string, context?: string): void {
    this.printLog('info', message, context);
  }

  /**
   * 记录详细消息
   *
   * @param message - 详细消息
   * @param context - 上下文（可选）
   */
  verbose(message: string, context?: string): void {
    this.printLog('verbose', message, context);
  }

  /**
   * 记录调试消息
   *
   * @param message - 调试消息
   * @param context - 上下文（可选）
   */
  debug(message: string, context?: string): void {
    this.printLog('debug', message, context);
  }

  /**
   * 打印日志消息
   *
   * @private
   * @param level - 日志级别
   * @param message - 日志消息
   * @param context - 上下文（可选）
   */
  private printLog(level: string, message: string, context?: string): void {
    const timestamp = new Date().toISOString();
    const ctx = this.printContext(context);
    const levelUpper = level.toUpperCase().padEnd(7);

    const logMessage = `[${timestamp}] ${levelUpper} ${ctx} ${message}`;

    switch (level) {
      case 'error':
        console.error(logMessage);
        break;
      case 'warn':
        console.warn(logMessage);
        break;
      case 'debug':
        console.debug(logMessage);
        break;
      default:
        this.logger(logMessage);
    }
  }

  /**
   * 打印上下文信息
   *
   * @private
   * @param context - 上下文（可选）
   * @returns string - 格式化后的上下文字符串
   */
  private printContext(context?: string): string {
    return `[${context || this.defaultContext}]`;
  }
}
