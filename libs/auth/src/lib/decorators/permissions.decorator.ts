/**
 * 权限装饰器
 *
 * @description
 * 用于标记路由所需的权限。
 *
 * @package @oksai/auth
 */

import { SetMetadata } from '@nestjs/common';
import { PermissionsEnum } from '../entities/permission.enum';

/**
 * 权限元数据键
 */
export const PERMISSIONS_METADATA = 'permissions';

/**
 * 权限装饰器
 *
 * @description
 * 标记路由所需的权限。可以指定一个或多个权限。
 *
 * @param permissions - 所需的权限列表
 *
 * @example
 * ```typescript
 * @Permissions(PermissionsEnum.USER_VIEW, PermissionsEnum.USER_EDIT)
 * @Get('users')
 * getUsers() {
 *   return this.userService.findAll();
 * }
 * ```
 */
export const Permissions = (...permissions: PermissionsEnum[]) =>
  SetMetadata(PERMISSIONS_METADATA, permissions);
