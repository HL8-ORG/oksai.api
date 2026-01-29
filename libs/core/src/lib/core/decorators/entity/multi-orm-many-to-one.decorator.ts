/**
 * MultiORM 多对一关系装饰器
 *
 * @description
 * 定义多对一关系，当前仅支持 MikroORM。
 * 保留接口以便未来扩展 TypeORM 支持。
 *
 * @package @oksai/core
 */

import { ManyToOne, ManyToOneOptions } from '@mikro-orm/core';

/**
 * 目标实体类型
 */
export type TargetEntity<T> = string | (() => T | string);

/**
 * 反向关系类型
 */
export type InverseSide<T> = (entity: T) => any;

/**
 * 关系选项类型
 */
export interface RelationOptions {
  nullable?: boolean;
  onDelete?: 'CASCADE' | 'SET NULL' | 'RESTRICT' | 'NO ACTION';
  onUpdate?: 'CASCADE' | 'SET NULL' | 'RESTRICT' | 'NO ACTION';
  mappedBy?: string | ((entity: any) => any);
  [key: string]: any;
}

/**
 * MultiORM 多对一关系装饰器
 *
 * @description
 * 定义多对一关系，当前仅应用 MikroORM 装饰器。
 * 未来扩展 TypeORM 时，将同时应用两个装饰器。
 *
 * @param typeFunctionOrTarget - 目标实体类型函数或字符串
 * @param inverseSideOrOptions - 反向关系或选项
 * @param options - 关系选项（可选）
 * @returns PropertyDecorator - 属性装饰器
 *
 * @example
 * ```typescript
 * class User extends TenantBaseEntity {
 *   @MultiORMManyToOne(() => Tenant, { nullable: true, onDelete: 'CASCADE' })
 *   tenant?: Tenant;
 * }
 * ```
 */
export function MultiORMManyToOne<T = any, O = any>(
  typeFunctionOrTarget: TargetEntity<T>,
  inverseSideOrOptions?: InverseSide<O> | RelationOptions,
  options?: RelationOptions,
): PropertyDecorator {
  // 确定参数类型
  let typeFunction: TargetEntity<T>;
  let mikroOrmOptions: ManyToOneOptions<any, any>;

  if (typeof inverseSideOrOptions === 'function') {
    // 第二个参数是反向关系函数
    typeFunction = typeFunctionOrTarget;
    const inverseSide = inverseSideOrOptions;
    mikroOrmOptions = {
      ...(options || {}),
      mappedBy: inverseSide as any,
    } as ManyToOneOptions<any, any>;
  } else {
    // 第二个参数是选项
    typeFunction = typeFunctionOrTarget;
    mikroOrmOptions = (inverseSideOrOptions || options || {}) as ManyToOneOptions<any, any>;
  }

  // 当前仅支持 MikroORM
  // 未来扩展：同时应用 TypeORM ManyToOne 装饰器
  return (target: any, propertyKey: string | symbol) => {
    // 应用 MikroORM ManyToOne 装饰器
    ManyToOne(typeFunction as any, mikroOrmOptions as any)(target, propertyKey as string);

    // TODO: 未来扩展 TypeORM 支持
    // if (getORMType() === MultiORMEnum.TypeORM) {
    //   ManyToOne(typeFunction, options)(target, propertyKey);
    // }
  };
}
