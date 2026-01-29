/**
 * JWT 认证守卫
 *
 * @description
 * 保护需要认证的路由，验证 JWT Token。
 *
 * @package @oksai/auth
 */

import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

/**
 * JWT 认证守卫
 *
 * @description
 * 继承 Passport 的 AuthGuard，用于保护需要认证的路由。
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * 构造函数
   *
   * @param reflector - 反射器，用于获取元数据
   */
  constructor(private reflector: Reflector) {
    super();
  }

  /**
   * 判断是否允许访问
   *
   * @description
   * 检查路由是否标记为公开，如果是则允许访问。
   *
   * @param context - 执行上下文
   * @returns boolean - 是否允许访问
   */
  canActivate(context: ExecutionContext) {
    // 检查是否有 @Public() 装饰器
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context) as boolean | Promise<boolean>;
  }
}
