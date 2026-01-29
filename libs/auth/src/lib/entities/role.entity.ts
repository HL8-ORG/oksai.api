/**
 * 角色实体
 *
 * @description
 * 系统角色实体，用于 RBAC 权限控制。
 *
 * @package @oksai/auth
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TenantBaseEntity } from '@oksai/core';
import { MultiORMColumn, MultiORMEntity, MultiORMOneToMany } from '@oksai/core';
import { RolePermission } from './role-permission.entity';

/**
 * 角色实体类
 *
 * @description
 * 系统角色实体，继承 TenantBaseEntity 实现多租户隔离。
 */
@MultiORMEntity('role')
export class Role extends TenantBaseEntity {
  /**
   * 角色名称
   */
  @ApiProperty({ type: () => String })
  @IsNotEmpty()
  @IsString()
  @MultiORMColumn({ unique: true })
  name!: string;

  /**
   * 是否为系统角色
   */
  @ApiPropertyOptional({ type: () => Boolean, default: false })
  @IsOptional()
  @IsBoolean()
  @MultiORMColumn({ default: false })
  isSystem?: boolean;

  /**
   * 角色描述
   */
  @ApiPropertyOptional({ type: () => String })
  @IsOptional()
  @IsString()
  @MultiORMColumn({ nullable: true })
  description?: string;

  /**
   * 角色权限关联（一对多）
   */
  @MultiORMOneToMany(() => RolePermission, (it: RolePermission) => it.role, { cascade: true })
  rolePermissions?: RolePermission[];
}
