/**
 * 认证模块
 *
 * @description
 * 提供用户认证和授权功能。
 *
 * @package @oksai/auth
 */

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User, Role, RolePermission } from './entities';
import { AuthService } from './services/auth.service';
import { RolePermissionService } from './services/role-permission.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PermissionGuard } from './guards/permission.guard';

/**
 * 认证模块
 *
 * @description
 * 提供 JWT 认证功能。
 */
@Module({
  imports: [
    // Passport 模块
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // JWT 模块
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
      } as any,
    }),
    // MikroORM 模块（注册实体）
    MikroOrmModule.forFeature([User, Role, RolePermission]),
  ],
  providers: [
    AuthService,
    RolePermissionService,
    JwtStrategy,
    JwtAuthGuard,
    PermissionGuard,
  ],
  exports: [
    AuthService,
    RolePermissionService,
    JwtAuthGuard,
    PermissionGuard,
    JwtModule,
  ],
})
export class AuthModule {}
