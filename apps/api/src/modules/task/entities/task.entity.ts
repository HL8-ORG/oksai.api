/**
 * Task 实体
 *
 * @description
 * 任务实体，作为示例业务模块展示完整的 CRUD、CQRS 和事件发布功能。
 *
 * @package @oksai/api
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { TenantOrganizationBaseEntity } from '@oksai/core';
import { MultiORMColumn, MultiORMEntity } from '@oksai/core';

/**
 * 任务状态枚举
 */
export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
}

/**
 * Task 实体类
 *
 * @description
 * 任务实体，继承 TenantOrganizationBaseEntity 实现多租户和组织隔离。
 */
@MultiORMEntity('task')
export class Task extends TenantOrganizationBaseEntity {
  /**
   * 任务标题
   */
  @ApiProperty({ type: () => String, description: '任务标题' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @MultiORMColumn({ type: 'varchar', length: 255 })
  title!: string;

  /**
   * 任务描述
   */
  @ApiPropertyOptional({ type: () => String, description: '任务描述' })
  @IsOptional()
  @IsString()
  @MultiORMColumn({ type: 'text', nullable: true })
  description?: string;

  /**
   * 任务状态
   */
  @ApiProperty({ type: () => String, enum: TaskStatus, description: '任务状态' })
  @IsNotEmpty()
  @IsString()
  @MultiORMColumn({ type: 'varchar', length: 20, default: TaskStatus.TODO })
  status!: TaskStatus;

  /**
   * 是否完成
   */
  @ApiPropertyOptional({ type: () => Boolean, description: '是否完成', default: false })
  @IsOptional()
  @IsBoolean()
  @MultiORMColumn({ type: 'boolean', default: false })
  isCompleted!: boolean;

  /**
   * 优先级（1-5，5 为最高）
   */
  @ApiPropertyOptional({ type: () => Number, description: '优先级（1-5）', default: 3 })
  @IsOptional()
  @MultiORMColumn({ type: 'integer', default: 3 })
  priority?: number;

  /**
   * 截止日期
   */
  @ApiPropertyOptional({ type: () => Date, description: '截止日期' })
  @IsOptional()
  @MultiORMColumn({ type: 'timestamp', nullable: true })
  dueDate?: Date;
}
