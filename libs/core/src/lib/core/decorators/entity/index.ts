/**
 * 实体装饰器导出
 *
 * @package @oksai/core
 */

export * from './multi-orm-column.decorator';
export * from './multi-orm-entity.decorator';
export {
  MultiORMManyToOne,
  type TargetEntity as ManyToOneTargetEntity,
  type InverseSide as ManyToOneInverseSide,
  type RelationOptions as ManyToOneRelationOptions,
} from './multi-orm-many-to-one.decorator';
export {
  MultiORMOneToMany,
  type TargetEntity as OneToManyTargetEntity,
  type InverseSide as OneToManyInverseSide,
  type RelationOptions as OneToManyRelationOptions,
} from './multi-orm-one-to-many.decorator';