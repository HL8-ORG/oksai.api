/**
 * Query 基类
 *
 * @description
 * 所有 Query 的抽象基类，用于 CQRS 模式中的查询。
 *
 * @package @oksai/core
 */

/**
 * Query 基类接口
 *
 * @description
 * 所有查询必须实现此接口。
 *
 * @template TResult - 查询结果的类型（保留用于未来扩展，当前未使用）
 */
export interface IQuery<_TResult = any> {
  /**
   * 查询唯一标识符（可选）
   */
  id?: string;
}

/**
 * Query 基类
 *
 * @description
 * 所有查询的抽象基类，提供查询的基本属性。
 *
 * @template TResult - 查询结果的类型
 */
export abstract class BaseQuery<TResult = any> implements IQuery<TResult> {
  /**
   * 查询唯一标识符
   */
  public readonly id: string;

  /**
   * 查询创建时间
   */
  public readonly createdAt: Date;

  /**
   * 构造函数
   *
   * @description
   * 初始化查询 ID 和创建时间。
   */
  constructor() {
    this.id = crypto.randomUUID();
    this.createdAt = new Date();
  }
}
