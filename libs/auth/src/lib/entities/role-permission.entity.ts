/**
 * 角色权限关联实体
 *
 * @description
 * 角色和权限的关联实体，用于实现 RBAC 权限控制。
 *
 * @package @oksai/auth
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { TenantBaseEntity } from '@oksai/core';
import { MultiORMColumn, MultiORMEntity, MultiORMManyToOne } from '@oksai/core';
import { Role } from './role.entity';
import { PermissionsEnum } from './permission.enum';

/**
 * 角色权限关联实体类
 *
 * @description
 * 关联角色和权限，继承 TenantBaseEntity 实现多租户隔离。
 */
@MultiORMEntity('role_permission')
export class RolePermission extends TenantBaseEntity {
  /**
   * 权限名称
   */
  @ApiProperty({ type: () => String, enum: PermissionsEnum })
  @IsEnum(PermissionsEnum)
  @IsString()
  @MultiORMColumn()
  permission!: PermissionsEnum;

  /**
   * 是否启用
   */
  @ApiPropertyOptional({ type: () => Boolean, default: false })
  @IsOptional()
  @IsBoolean()
  @MultiORMColumn({ default: false })
  enabled!: boolean;

  /**
   * 权限描述
   */
  @ApiPropertyOptional({ type: () => String })
  @IsOptional()
  @IsString()
  @MultiORMColumn({ nullable: true })
  description?: string;

  /**
   * 角色关联（多对一）
   */
  @MultiORMManyToOne(() => Role, (it) => it.rolePermissions, {
    onDelete: 'CASCADE',
  })
  role!: Role;

  /**
   * 角色 ID
   */
  @ApiProperty({ type: () => String })
  @MultiORMColumn({ relationId: true })
  roleId!: string;
}
