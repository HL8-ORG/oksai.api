/**
 * 角色权限服务
 *
 * @description
 * 提供角色权限管理功能，包括权限检查等。
 *
 * @package @oksai/auth
 */

import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { RolePermission } from '../entities/role-permission.entity';
import { PermissionsEnum } from '../entities/permission.enum';

/**
 * 角色权限服务
 *
 * @description
 * 提供角色权限管理功能。
 */
@Injectable()
export class RolePermissionService {
  /**
   * 构造函数
   *
   * @param rolePermissionRepository - 角色权限仓库
   */
  constructor(
    @InjectRepository(RolePermission)
    private readonly rolePermissionRepository: EntityRepository<RolePermission>,
  ) {}

  /**
   * 检查角色权限
   *
   * @description
   * 检查指定角色是否拥有指定的权限。
   *
   * @param tenantId - 租户 ID
   * @param roleId - 角色 ID
   * @param permissions - 需要检查的权限列表
   * @param requireAll - 是否需要所有权限（默认 false，即任意一个权限即可）
   * @returns Promise<boolean> - 是否有权限
   */
  async checkRolePermission(
    tenantId: string,
    roleId: string,
    permissions: PermissionsEnum[],
    requireAll: boolean = false,
  ): Promise<boolean> {
    if (!permissions || permissions.length === 0) {
      return true;
    }

    // 查询角色的所有启用权限
    const rolePermissions = await this.rolePermissionRepository.find({
      roleId,
      tenantId,
      enabled: true,
      permission: { $in: permissions },
    });

    const hasPermissions = rolePermissions.map((rp) => rp.permission);

    if (requireAll) {
      // 需要所有权限
      return permissions.every((p) => hasPermissions.includes(p));
    } else {
      // 任意一个权限即可
      return permissions.some((p) => hasPermissions.includes(p));
    }
  }

  /**
   * 获取角色的所有权限
   *
   * @description
   * 获取指定角色的所有启用权限。
   *
   * @param tenantId - 租户 ID
   * @param roleId - 角色 ID
   * @returns Promise<PermissionsEnum[]> - 权限列表
   */
  async getRolePermissions(
    tenantId: string,
    roleId: string,
  ): Promise<PermissionsEnum[]> {
    const rolePermissions = await this.rolePermissionRepository.find({
      roleId,
      tenantId,
      enabled: true,
    });

    return rolePermissions.map((rp) => rp.permission);
  }
}
