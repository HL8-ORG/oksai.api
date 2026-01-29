/**
 * Oksai Auth 模块
 *
 * @description
 * 认证授权模块，提供用户认证和授权功能。
 *
 * @package @oksai/auth
 */

export * from './lib/entities';
export * from './lib/services/auth.service';
export * from './lib/services/role-permission.service';
export * from './lib/strategies/jwt.strategy';
export * from './lib/guards/jwt-auth.guard';
export * from './lib/guards/permission.guard';
export * from './lib/decorators/public.decorator';
export * from './lib/decorators/permissions.decorator';
export * from './lib/auth.module';
