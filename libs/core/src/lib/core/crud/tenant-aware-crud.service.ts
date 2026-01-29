/**
 * 多租户感知的 CRUD 服务基类
 *
 * @description
 * 继承自 CrudService，添加多租户支持。
 * 所有需要多租户隔离的 CRUD 服务应继承此类。
 *
 * @package @oksai/core
 */

import { Injectable } from '@nestjs/common';
import { EntityRepository, FilterQuery, FindOptions, EntityManager } from '@mikro-orm/core';
import { TenantBaseEntity } from '../entities';
import { RequestContext } from '../context';
import { CrudService } from './crud.service';
import { ICrudService } from './icrud.service';

/**
 * 多租户感知的 CRUD 服务基类
 *
 * @description
 * 抽象基类，提供多租户隔离的 CRUD 操作。
 * 自动在所有查询中添加租户过滤条件。
 *
 * @template T - 实体类型，必须继承 TenantBaseEntity
 */
@Injectable()
export abstract class TenantAwareCrudService<T extends TenantBaseEntity>
  extends CrudService<T>
  implements ICrudService<T>
{
  /**
   * 构造函数
   *
   * @param repository - MikroORM 实体仓库
   * @param em - MikroORM 实体管理器
   */
  constructor(repository: EntityRepository<T>, em: EntityManager) {
    super(repository, em);
  }

  /**
   * 添加租户过滤条件
   *
   * @description
   * 从 RequestContext 获取租户 ID，并添加到过滤条件中。
   *
   * @param filter - 原始过滤条件
   * @returns FilterQuery<T> - 添加了租户过滤的条件
   */
  protected addTenantFilter(filter?: FilterQuery<T>): FilterQuery<T> {
    const tenantId = RequestContext.getTenantId();
    if (tenantId) {
      const baseFilter = filter || {};
      return {
        ...baseFilter,
        tenantId,
      } as FilterQuery<T>;
    }
    return filter || ({} as FilterQuery<T>);
  }

  /**
   * 统计实体数量（带租户过滤）
   *
   * @param filter - 过滤条件（可选）
   * @returns Promise<number> - 实体数量
   */
  async count(filter?: FilterQuery<T>): Promise<number> {
    return await super.count(this.addTenantFilter(filter));
  }

  /**
   * 查找所有实体（带租户过滤）
   *
   * @param options - 查找选项（可选）
   * @returns Promise<IPagination<T>> - 分页结果
   */
  async findAll(options?: FindOptions<T>): Promise<any> {
    const filter = this.addTenantFilter();
    return await super.findAll({ ...options, where: filter } as FindOptions<T>);
  }

  /**
   * 根据 ID 查找单个实体（带租户过滤）
   *
   * @param id - 实体 ID
   * @param options - 查找选项（可选）
   * @returns Promise<T | null> - 实体或 null
   */
  async findOneById(id: string, options?: FindOptions<T>): Promise<T | null> {
    const filter = this.addTenantFilter({ id } as FilterQuery<T>);
    return await this.repository.findOne(filter, options as any);
  }
}
