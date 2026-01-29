/**
 * 权限枚举
 *
 * @description
 * 定义系统中所有可用的权限。
 *
 * @package @oksai/auth
 */

/**
 * 权限枚举
 *
 * @description
 * 系统支持的所有权限类型。
 * 可以根据业务需求扩展。
 */
export enum PermissionsEnum {
  // 用户管理权限
  USER_VIEW = 'USER_VIEW',
  USER_CREATE = 'USER_CREATE',
  USER_EDIT = 'USER_EDIT',
  USER_DELETE = 'USER_DELETE',

  // 角色管理权限
  ROLE_VIEW = 'ROLE_VIEW',
  ROLE_CREATE = 'ROLE_CREATE',
  ROLE_EDIT = 'ROLE_EDIT',
  ROLE_DELETE = 'ROLE_DELETE',

  // 组织管理权限
  ORGANIZATION_VIEW = 'ORGANIZATION_VIEW',
  ORGANIZATION_CREATE = 'ORGANIZATION_CREATE',
  ORGANIZATION_EDIT = 'ORGANIZATION_EDIT',
  ORGANIZATION_DELETE = 'ORGANIZATION_DELETE',

  // 租户管理权限
  TENANT_VIEW = 'TENANT_VIEW',
  TENANT_CREATE = 'TENANT_CREATE',
  TENANT_EDIT = 'TENANT_EDIT',
  TENANT_DELETE = 'TENANT_DELETE',
}
