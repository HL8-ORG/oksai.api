/**
 * Multi-ORM One-to-Many 装饰器
 *
 * @description
 * 提供跨 ORM 的一对多关系装饰器。
 * 当前仅支持 MikroORM，未来可扩展支持 TypeORM。
 *
 * @package @oksai/core
 */

import { OneToMany, OneToManyOptions, Cascade } from '@mikro-orm/core';

/**
 * 目标实体类型
 */
export type TargetEntity<T> = string | (() => T | string);

/**
 * 反向关系类型
 */
export type InverseSide<T> = (entity: T) => any;

/**
 * Multi-ORM One-to-Many 关系选项
 */
export interface RelationOptions {
  /**
   * 级联操作
   */
  cascade?: boolean | Cascade[];

  /**
   * 删除时操作
   */
  onDelete?: 'CASCADE' | 'SET NULL' | 'RESTRICT' | 'NO ACTION';

  /**
   * 更新时操作
   */
  onUpdate?: 'CASCADE' | 'SET NULL' | 'RESTRICT' | 'NO ACTION';

  /**
   * 其他选项
   */
  [key: string]: any;
}

/**
 * Multi-ORM One-to-Many 装饰器
 *
 * @description
 * 定义一对多关系，当前仅支持 MikroORM。
 *
 * @param typeFunctionOrTarget - 目标实体类型函数或字符串
 * @param inverseSideOrOptions - 反向关系或选项
 * @param options - 关系选项（可选）
 * @returns PropertyDecorator - 属性装饰器
 */
export function MultiORMOneToMany<T, O>(
  typeFunctionOrTarget: TargetEntity<T>,
  inverseSideOrOptions?: InverseSide<O> | RelationOptions,
  options?: RelationOptions,
): PropertyDecorator {
  // 确定参数类型
  let typeFunction: TargetEntity<T>;
  let mikroOrmOptions: OneToManyOptions<any, any>;

  if (typeof inverseSideOrOptions === 'function') {
    // 第二个参数是反向关系函数
    typeFunction = typeFunctionOrTarget;
    const inverseSide = inverseSideOrOptions;
    const opts = options || {};
    // 转换 cascade 选项
    if (opts.cascade === true) {
      opts.cascade = ['persist', 'remove'] as Cascade[];
    } else if (opts.cascade === false) {
      opts.cascade = [];
    }
    mikroOrmOptions = {
      ...opts,
      mappedBy: inverseSide as any,
    } as OneToManyOptions<any, any>;
  } else {
    // 第二个参数是选项
    typeFunction = typeFunctionOrTarget;
    const opts = (inverseSideOrOptions || options || {}) as any;
    // 转换 cascade 选项
    if (opts.cascade === true) {
      opts.cascade = ['persist', 'remove'] as Cascade[];
    } else if (opts.cascade === false) {
      opts.cascade = [];
    }
    mikroOrmOptions = opts as OneToManyOptions<any, any>;
  }

  // 应用 MikroORM 装饰器
  return (target: any, propertyKey: string | symbol) => {
    // OneToMany 装饰器的正确调用方式
    (OneToMany as any)(typeFunction, mikroOrmOptions)(target, propertyKey as string);
  };
}
