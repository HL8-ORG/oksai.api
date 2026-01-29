/**
 * 事件基类
 *
 * @description
 * 所有事件的抽象基类，提供事件的基本属性。
 *
 * @package @oksai/core
 */

/**
 * 事件基类
 *
 * @description
 * 所有事件必须继承此类，提供唯一 ID 和创建时间戳。
 */
export abstract class BaseEvent {
  /**
   * 事件唯一 ID
   */
  public readonly id: string;

  /**
   * 事件创建时间
   */
  public readonly createdAt: Date;

  /**
   * 构造函数
   *
   * @description
   * 初始化事件 ID 和创建时间。
   */
  constructor() {
    this.id = crypto.randomUUID();
    this.createdAt = new Date();
  }
}
