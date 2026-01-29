/**
 * 实体基类
 *
 * @description
 * 提供所有实体的基础功能，包括：
 * - UUID 主键
 * - 创建和更新时间戳
 * - 软删除支持
 * - 激活和归档状态
 *
 * @package @oksai/core
 */

import { PrimaryKey, Property } from '@mikro-orm/core';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsOptional } from 'class-validator';
import { MultiORMColumn, MultiORMEntity } from '../decorators/entity';

/**
 * 基础实体模型接口
 */
export interface IBaseEntityModel {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  isActive?: boolean;
  isArchived?: boolean;
  archivedAt?: Date;
}

/**
 * 抽象模型基类
 *
 * @description
 * 提供动态属性赋值功能。
 */
export abstract class Model {
  constructor(input?: any) {
    if (input) {
      // 遍历输入对象的键值对
      for (const [key, value] of Object.entries(input)) {
        // 将值赋给实例的对应属性
        (this as any)[key] = value;
      }
    }
  }
}

/**
 * 基础实体类
 *
 * @description
 * 所有实体的基类，提供通用字段和功能。
 */
@MultiORMEntity()
export abstract class BaseEntity extends Model implements IBaseEntityModel {
  /**
   * 主键 ID（UUID）
   */
  @ApiPropertyOptional({ type: () => String })
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id?: string;

  /**
   * 是否激活
   */
  @ApiPropertyOptional({
    type: Boolean,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  @MultiORMColumn({ nullable: true, default: true })
  isActive?: boolean;

  /**
   * 是否归档
   */
  @ApiPropertyOptional({
    type: Boolean,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  @MultiORMColumn({ nullable: true, default: false })
  isArchived?: boolean;

  /**
   * 归档时间
   */
  @ApiPropertyOptional({
    type: 'string',
    format: 'date-time',
    example: '2018-11-21T06:20:32.232Z',
  })
  @IsOptional()
  @IsDateString()
  @MultiORMColumn({ nullable: true })
  archivedAt?: Date;

  /**
   * 创建时间
   */
  @ApiPropertyOptional({
    type: 'string',
    format: 'date-time',
    example: '2018-11-21T06:20:32.232Z',
  })
  @IsOptional()
  @IsDateString()
  @Property({
    onCreate: () => new Date(),
  })
  @MultiORMColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  /**
   * 更新时间
   */
  @ApiPropertyOptional({
    type: 'string',
    format: 'date-time',
    example: '2018-11-21T06:20:32.232Z',
  })
  @IsOptional()
  @IsDateString()
  @Property({
    onCreate: () => new Date(),
    onUpdate: () => new Date(),
  })
  @MultiORMColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt?: Date;

  /**
   * 删除时间（软删除）
   */
  @ApiPropertyOptional({
    type: 'string',
    format: 'date-time',
    example: '2018-11-21T06:20:32.232Z',
  })
  @IsOptional()
  @IsDateString()
  @Property({ nullable: true })
  @MultiORMColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
