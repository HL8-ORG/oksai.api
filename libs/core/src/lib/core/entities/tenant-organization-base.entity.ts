/**
 * 多租户组织实体基类
 *
 * @description
 * 继承自 TenantBaseEntity，添加组织支持。
 * 所有需要多租户和组织隔离的实体应继承此类。
 *
 * @package @oksai/core
 */

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { TenantBaseEntity } from './tenant-base.entity';
import { MultiORMManyToOne, MultiORMColumn } from '../decorators/entity';
import { Organization } from '../../organization/organization.entity';

/**
 * 多租户组织实体模型接口
 */
export interface IBasePerTenantAndOrganizationEntityModel {
  tenantId?: string;
  organizationId?: string;
}


/**
 * 多租户组织实体基类
 *
 * @description
 * 提供租户和组织隔离功能，所有需要多租户和组织支持的实体应继承此类。
 */
export abstract class TenantOrganizationBaseEntity
  extends TenantBaseEntity
  implements IBasePerTenantAndOrganizationEntityModel
{
  /**
   * 组织关系
   */
  @MultiORMManyToOne(() => Organization, {
    nullable: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  organization?: Organization;

  /**
   * 组织 ID
   */
  @ApiPropertyOptional({ type: () => String })
  @IsOptional()
  @IsUUID()
  @MultiORMColumn({ nullable: true, relationId: true })
  organizationId?: string;
}
