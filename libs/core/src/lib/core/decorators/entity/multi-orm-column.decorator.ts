/**
 * MultiORM 列装饰器
 *
 * @description
 * 为实体属性定义列，当前仅支持 MikroORM。
 * 保留接口以便未来扩展 TypeORM 支持。
 *
 * @package @oksai/core
 */

import { Property, PropertyOptions } from '@mikro-orm/core';

/**
 * 列选项类型
 */
export interface ColumnOptions {
  type?: string | Function;
  nullable?: boolean;
  default?: any;
  relationId?: boolean;
  [key: string]: any;
}

/**
 * MultiORM 列装饰器
 *
 * @description
 * 定义实体属性列，当前仅应用 MikroORM 装饰器。
 * 未来扩展 TypeORM 时，将同时应用两个装饰器。
 *
 * @param options - 列选项
 * @returns PropertyDecorator - 属性装饰器
 *
 * @example
 * ```typescript
 * class User extends BaseEntity {
 *   @MultiORMColumn({ type: 'varchar', length: 255 })
 *   name: string;
 * }
 * ```
 */
export function MultiORMColumn(options?: ColumnOptions): PropertyDecorator {
  // 当前仅支持 MikroORM
  // 未来扩展：同时应用 TypeORM Column 装饰器
  return (target: any, propertyKey: string | symbol) => {
    // 应用 MikroORM Property 装饰器
    Property(options as PropertyOptions<object>)(target, propertyKey as string);

    // TODO: 未来扩展 TypeORM 支持
    // if (getORMType() === MultiORMEnum.TypeORM) {
    //   Column(options)(target, propertyKey);
    // }
  };
}
