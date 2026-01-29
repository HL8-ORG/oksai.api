/**
 * 认证模块
 *
 * @description
 * 提供用户认证相关的功能模块。
 *
 * @package @oksai/api
 */

import { Module } from '@nestjs/common';
import { AuthModule as AuthCoreModule } from '@oksai/auth';
import { AuthController } from './controllers/auth.controller';

/**
 * 认证模块
 *
 * @description
 * 提供用户认证相关的功能。
 */
@Module({
  imports: [AuthCoreModule],
  controllers: [AuthController],
  providers: [],
  exports: [],
})
export class AuthModule {}
