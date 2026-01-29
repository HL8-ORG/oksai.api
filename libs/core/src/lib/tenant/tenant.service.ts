/**
 * 租户服务
 *
 * @description
 * 提供租户管理功能。
 *
 * @package @oksai/core
 */

import { Injectable } from '@nestjs/common';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { TenantAwareCrudService } from '../core/crud';
import { Tenant } from './tenant.entity';

/**
 * 租户服务
 *
 * @description
 * 提供租户管理功能。
 */
@Injectable()
export class TenantService extends TenantAwareCrudService<Tenant> {
  /**
   * 构造函数
   *
   * @param tenantRepository - 租户仓库
   * @param em - 实体管理器
   */
  constructor(
    @InjectRepository(Tenant)
    tenantRepository: EntityRepository<Tenant>,
    em: EntityManager,
  ) {
    super(tenantRepository, em);
  }
}
