/**
 * ORM 类型枚举和工具函数
 *
 * @description
 * 定义支持的 ORM 类型，并提供获取当前 ORM 类型的函数。
 * 当前仅支持 MikroORM，TypeORM 为未来扩展。
 *
 * @package @oksai/core
 */

/**
 * ORM 类型枚举
 *
 * @description
 * 定义系统支持的 ORM 类型。
 */
export enum MultiORMEnum {
  /** TypeORM（未来扩展） */
  TypeORM = 'typeorm',
  /** MikroORM（当前实现） */
  MikroORM = 'mikro-orm',
}

/**
 * ORM 类型
 *
 * @description
 * 联合类型，表示支持的 ORM 类型。
 */
export type MultiORM = MultiORMEnum.TypeORM | MultiORMEnum.MikroORM;

/**
 * 获取当前使用的 ORM 类型
 *
 * @description
 * 通过环境变量 DB_ORM 决定使用哪个 ORM。
 * 默认使用 MikroORM（当前唯一实现）。
 * TypeORM 支持为未来扩展计划。
 *
 * @param defaultValue - 默认 ORM 类型，默认为 MikroORM
 * @returns MultiORM - 当前使用的 ORM 类型
 *
 * @example
 * ```typescript
 * // 获取当前 ORM 类型
 * const ormType = getORMType();
 * if (ormType === MultiORMEnum.MikroORM) {
 *   // 使用 MikroORM
 * }
 * ```
 */
export function getORMType(defaultValue: MultiORM = MultiORMEnum.MikroORM): MultiORM {
  // 检查环境变量 DB_ORM 是否设置
  if (!process.env.DB_ORM) {
    return defaultValue;
  }

  // 根据 DB_ORM 的值决定 ORM 类型
  switch (process.env.DB_ORM) {
    case MultiORMEnum.TypeORM:
      // 未来扩展：TypeORM 支持
      // 当前返回默认值，因为 TypeORM 尚未实现
      console.warn('TypeORM 支持尚未实现，使用默认 ORM: MikroORM');
      return MultiORMEnum.MikroORM;
    case MultiORMEnum.MikroORM:
      return MultiORMEnum.MikroORM;
    default:
      // 如果提供了无效值，返回默认值
      console.warn(`无效的 ORM 类型: ${process.env.DB_ORM}，使用默认值: MikroORM`);
      return defaultValue;
  }
}
