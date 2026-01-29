/**
 * 租户实体
 *
 * @description
 * 系统租户实体，用于多租户数据隔离。
 * 每个租户代表一个独立的客户或业务单元。
 *
 * @package @oksai/core
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { BaseEntity } from '../core/entities';
import { MultiORMColumn, MultiORMEntity, MultiORMOneToMany } from '../core/decorators/entity';
import { Organization } from '../organization/organization.entity';

/**
 * 租户实体类
 *
 * @description
 * 系统租户实体，继承 BaseEntity。
 * 每个租户代表一个独立的客户或业务单元。
 */
@MultiORMEntity('tenant')
export class Tenant extends BaseEntity {
  /**
   * 租户名称
   */
  @ApiProperty({ type: () => String })
  @IsString()
  @IsOptional()
  @MultiORMColumn()
  name?: string;

  /**
   * 租户 Logo URL
   */
  @ApiPropertyOptional({ type: () => String })
  @IsOptional()
  @IsString()
  @MultiORMColumn({ nullable: true })
  logo?: string;

  /**
   * 组织列表（一对多）
   */
  @MultiORMOneToMany(() => Organization, (it: Organization) => it.tenant, {
    cascade: true,
  })
  organizations?: Organization[];
}
