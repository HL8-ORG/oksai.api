/**
 * Command 基类
 *
 * @description
 * 所有 Command 的抽象基类，用于 CQRS 模式中的命令。
 *
 * @package @oksai/core
 */

/**
 * Command 基类接口
 *
 * @description
 * 所有命令必须实现此接口。
 */
export interface ICommand {
  /**
   * 命令唯一标识符（可选）
   */
  id?: string;
}

/**
 * Command 基类
 *
 * @description
 * 所有命令的抽象基类，提供命令的基本属性。
 */
export abstract class BaseCommand implements ICommand {
  /**
   * 命令唯一标识符
   */
  public readonly id: string;

  /**
   * 命令创建时间
   */
  public readonly createdAt: Date;

  /**
   * 构造函数
   *
   * @description
   * 初始化命令 ID 和创建时间。
   */
  constructor() {
    this.id = crypto.randomUUID();
    this.createdAt = new Date();
  }
}
