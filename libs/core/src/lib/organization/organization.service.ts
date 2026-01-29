/**
 * 组织服务
 *
 * @description
 * 提供组织管理功能。
 *
 * @package @oksai/core
 */

import { Injectable } from '@nestjs/common';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { TenantAwareCrudService } from '../core/crud';
import { Organization } from './organization.entity';

/**
 * 组织服务
 *
 * @description
 * 提供组织管理功能。
 */
@Injectable()
export class OrganizationService extends TenantAwareCrudService<Organization> {
  /**
   * 构造函数
   *
   * @param organizationRepository - 组织仓库
   * @param em - 实体管理器
   */
  constructor(
    @InjectRepository(Organization)
    organizationRepository: EntityRepository<Organization>,
    em: EntityManager,
  ) {
    super(organizationRepository, em);
  }
}
