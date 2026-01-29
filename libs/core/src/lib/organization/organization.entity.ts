/**
 * 组织实体
 *
 * @description
 * 系统组织实体，用于多租户下的组织管理。
 * 每个租户可以有多个组织。
 *
 * @package @oksai/core
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TenantBaseEntity } from '../core/entities';
import { MultiORMColumn, MultiORMEntity, MultiORMManyToOne } from '../core/decorators/entity';
import { Tenant } from '../tenant/tenant.entity';

/**
 * 组织实体类
 *
 * @description
 * 系统组织实体，继承 TenantBaseEntity 实现多租户隔离。
 * 每个租户可以有多个组织。
 */
@MultiORMEntity('organization')
export class Organization extends TenantBaseEntity {
  /**
   * 组织名称
   */
  @ApiProperty({ type: () => String })
  @IsNotEmpty()
  @IsString()
  @MultiORMColumn()
  name!: string;

  /**
   * 是否为默认组织
   */
  @ApiPropertyOptional({ type: () => Boolean, default: false })
  @IsOptional()
  @IsBoolean()
  @MultiORMColumn({ default: false })
  isDefault?: boolean;

  /**
   * 组织 Logo URL
   */
  @ApiPropertyOptional({ type: () => String })
  @IsOptional()
  @IsString()
  @MultiORMColumn({ nullable: true })
  logo?: string;

  /**
   * 组织描述
   */
  @ApiPropertyOptional({ type: () => String })
  @IsOptional()
  @IsString()
  @MultiORMColumn({ nullable: true })
  description?: string;

  /**
   * 租户关联（多对一）
   * 注意：此属性覆盖了 TenantBaseEntity 中的 tenant 属性
   */
  @MultiORMManyToOne(() => Tenant, (it: Tenant) => it.organizations, {
    onDelete: 'CASCADE',
  })
  declare tenant: Tenant;
}
