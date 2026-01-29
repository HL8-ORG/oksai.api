/**
 * 组织模块
 *
 * @description
 * 提供组织管理功能。
 *
 * @package @oksai/core
 */

import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Organization } from './organization.entity';
import { OrganizationService } from './organization.service';
import { TenantModule } from '../tenant/tenant.module';

/**
 * 组织模块
 *
 * @description
 * 提供组织管理功能。
 */
@Module({
  imports: [
    MikroOrmModule.forFeature([Organization]),
    TenantModule,
  ],
  providers: [OrganizationService],
  exports: [OrganizationService],
})
export class OrganizationModule {}
