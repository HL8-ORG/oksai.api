/**
 * MultiORM 实体装饰器
 *
 * @description
 * 定义实体类，当前仅支持 MikroORM。
 * 保留接口以便未来扩展 TypeORM 支持。
 *
 * @package @oksai/core
 */

import { Entity, EntityOptions } from '@mikro-orm/core';

/**
 * 实体选项类型
 */
export interface MultiORMEntityOptions extends Partial<EntityOptions<any>> {
  tableName?: string;
  [key: string]: any;
}

/**
 * MultiORM 实体装饰器
 *
 * @description
 * 定义实体类，当前仅应用 MikroORM 装饰器。
 * 未来扩展 TypeORM 时，将同时应用两个装饰器。
 *
 * @param nameOrOptions - 表名或实体选项
 * @param options - 实体选项（当第一个参数是表名时）
 * @returns ClassDecorator - 类装饰器
 *
 * @example
 * ```typescript
 * @MultiORMEntity('users')
 * class User extends BaseEntity {
 *   // ...
 * }
 * ```
 */
export function MultiORMEntity(
  nameOrOptions?: string | MultiORMEntityOptions,
  options?: MultiORMEntityOptions,
): ClassDecorator {
  // 当前仅支持 MikroORM
  // 未来扩展：同时应用 TypeORM Entity 装饰器

  // 处理参数
  let tableName: string | undefined;
  let entityOptions: MultiORMEntityOptions = {};

  if (typeof nameOrOptions === 'string') {
    tableName = nameOrOptions;
    entityOptions = options || {};
  } else if (nameOrOptions) {
    entityOptions = nameOrOptions;
    tableName = nameOrOptions.tableName;
  }

  return (target: any) => {
    // 应用 MikroORM Entity 装饰器
    const mikroOrmOptions: EntityOptions<any> = {
      tableName: tableName || target.name.toLowerCase() + 's',
      ...entityOptions,
    } as EntityOptions<any>;
    Entity(mikroOrmOptions)(target);

    // TODO: 未来扩展 TypeORM 支持
    // if (getORMType() === MultiORMEnum.TypeORM) {
    //   Entity(tableName, options)(target);
    // }
  };
}
