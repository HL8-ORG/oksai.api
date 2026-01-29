/**
 * 权限守卫
 *
 * @description
 * 保护需要特定权限的路由，验证用户是否拥有所需权限。
 *
 * @package @oksai/auth
 */

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequestContext } from '@oksai/core';
import { PermissionsEnum } from '../entities/permission.enum';
import { RolePermissionService } from '../services/role-permission.service';
import { PERMISSIONS_METADATA } from '../decorators/permissions.decorator';

/**
 * 权限守卫
 *
 * @description
 * 检查用户是否拥有访问路由所需的权限。
 */
@Injectable()
export class PermissionGuard implements CanActivate {
  /**
   * 构造函数
   *
   * @param reflector - 反射器，用于获取元数据
   * @param rolePermissionService - 角色权限服务
   */
  constructor(
    private readonly reflector: Reflector,
    private readonly rolePermissionService: RolePermissionService,
  ) {}

  /**
   * 判断是否允许访问
   *
   * @description
   * 检查用户是否拥有路由所需的权限。
   *
   * @param context - 执行上下文
   * @returns Promise<boolean> - 是否允许访问
   * @throws ForbiddenException - 当用户没有权限时抛出
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 获取路由所需的权限
    const requiredPermissions = this.reflector.getAllAndOverride<
      PermissionsEnum[]
    >(PERMISSIONS_METADATA, [context.getHandler(), context.getClass()]);

    // 如果没有指定权限，允许访问
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    // 从请求上下文获取租户 ID 和角色 ID
    const tenantId = RequestContext.getTenantId();
    const roleId = RequestContext.getOrganizationId(); // 临时使用，后续需要从用户信息中获取

    if (!tenantId || !roleId) {
      throw new ForbiddenException('缺少租户或角色信息');
    }

    // 检查权限（需要所有权限）
    const hasPermission = await this.rolePermissionService.checkRolePermission(
      tenantId,
      roleId,
      requiredPermissions,
      true, // 需要所有权限
    );

    if (!hasPermission) {
      throw new ForbiddenException(
        `缺少所需权限: ${requiredPermissions.join(', ')}`,
      );
    }

    return true;
  }
}
