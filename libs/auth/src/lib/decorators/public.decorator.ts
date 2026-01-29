/**
 * 公开路由装饰器
 *
 * @description
 * 用于标记不需要认证的公开路由。
 *
 * @package @oksai/auth
 */

import { SetMetadata } from '@nestjs/common';

/**
 * 公开路由元数据键
 */
export const IS_PUBLIC_KEY = 'isPublic';

/**
 * 公开路由装饰器
 *
 * @description
 * 标记路由为公开，跳过 JWT 认证。
 *
 * @example
 * ```typescript
 * @Public()
 * @Get('public')
 * publicRoute() {
 *   return 'This is a public route';
 * }
 * ```
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
