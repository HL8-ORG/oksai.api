/**
 * CRUD 服务基类
 *
 * @description
 * 提供通用的 CRUD 操作实现，基于 MikroORM。
 * 所有需要 CRUD 功能的服务应继承此类。
 *
 * @package @oksai/core
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import {
  EntityRepository,
  FilterQuery,
  FindOptions,
  RequiredEntityData,
  wrap,
  EntityManager,
} from '@mikro-orm/core';
import { BaseEntity } from '../entities';
import { ICrudService, IPagination } from './icrud.service';

/**
 * CRUD 服务基类
 *
 * @description
 * 抽象基类，提供通用的 CRUD 操作实现。
 *
 * @template T - 实体类型，必须继承 BaseEntity
 */
@Injectable()
export abstract class CrudService<T extends BaseEntity> implements ICrudService<T> {
  /**
   * 构造函数
   *
   * @param repository - MikroORM 实体仓库
   * @param em - MikroORM 实体管理器
   */
  constructor(
    protected readonly repository: EntityRepository<T>,
    protected readonly em: EntityManager,
  ) {}

  /**
   * 统计实体数量
   *
   * @param filter - 过滤条件（可选）
   * @returns Promise<number> - 实体数量
   */
  async count(filter?: FilterQuery<T>): Promise<number> {
    return await this.repository.count(filter || {});
  }

  /**
   * 查找所有实体
   *
   * @param options - 查找选项（可选）
   * @returns Promise<IPagination<T>> - 分页结果
   */
  async findAll(options?: FindOptions<T>): Promise<IPagination<T>> {
    const [items, total] = await this.repository.findAndCount({} as FilterQuery<T>, options);
    return {
      items,
      total,
    };
  }

  /**
   * 根据 ID 查找单个实体
   *
   * @param id - 实体 ID
   * @param options - 查找选项（可选）
   * @returns Promise<T | null> - 实体或 null
   */
  async findOneById(id: string, options?: FindOptions<T>): Promise<T | null> {
    return await this.repository.findOne({ id } as FilterQuery<T>, options as any);
  }

  /**
   * 创建实体
   *
   * @param entity - 实体数据
   * @returns Promise<T> - 创建的实体
   */
  async create(entity: RequiredEntityData<T>): Promise<T> {
    const newEntity = this.repository.create(entity);
    this.em.persist(newEntity);
    await this.em.flush();
    return newEntity;
  }

  /**
   * 更新实体
   *
   * @param id - 实体 ID
   * @param entity - 更新的实体数据
   * @returns Promise<T> - 更新后的实体
   */
  async update(id: string, entity: Partial<T>): Promise<T> {
    const existingEntity = await this.findOneById(id);
    if (!existingEntity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }

    wrap(existingEntity).assign(entity as any);
    await this.em.flush();
    return existingEntity;
  }

  /**
   * 删除实体
   *
   * @param id - 实体 ID
   * @returns Promise<void>
   */
  async delete(id: string): Promise<void> {
    const entity = await this.findOneById(id);
    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }

    this.em.remove(entity);
    await this.em.flush();
  }
}
