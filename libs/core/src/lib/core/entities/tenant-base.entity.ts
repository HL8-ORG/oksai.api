/**
 * 多租户实体基类
 *
 * @description
 * 继承自 BaseEntity，添加多租户支持。
 * 所有需要多租户隔离的实体应继承此类。
 *
 * @package @oksai/core
 */

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { BaseEntity } from './base.entity';
import { MultiORMManyToOne, MultiORMColumn } from '../decorators/entity';
import { Tenant } from '../../tenant/tenant.entity';

/**
 * 多租户实体模型接口
 */
export interface IBasePerTenantEntityModel {
  tenantId?: string;
}


/**
 * 多租户实体基类
 *
 * @description
 * 提供租户隔离功能，所有需要多租户支持的实体应继承此类。
 */
export abstract class TenantBaseEntity
  extends BaseEntity
  implements IBasePerTenantEntityModel
{
  /**
   * 租户关系
   */
  @MultiORMManyToOne(() => Tenant, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  tenant?: Tenant;

  /**
   * 租户 ID
   */
  @ApiPropertyOptional({ type: () => String })
  @IsOptional()
  @IsUUID()
  @MultiORMColumn({ nullable: true, relationId: true })
  tenantId?: string;
}
