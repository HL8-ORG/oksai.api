/**
 * 租户模块
 *
 * @description
 * 提供租户管理功能。
 *
 * @package @oksai/core
 */

import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Tenant } from './tenant.entity';
import { TenantService } from './tenant.service';

/**
 * 租户模块
 *
 * @description
 * 提供租户管理功能。
 */
@Module({
  imports: [MikroOrmModule.forFeature([Tenant])],
  providers: [TenantService],
  exports: [TenantService],
})
export class TenantModule {}
