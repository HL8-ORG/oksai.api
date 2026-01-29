/**
 * CRUD 服务接口
 *
 * @description
 * 定义 CRUD 服务的基本接口，提供通用的数据操作功能。
 *
 * @package @oksai/core
 */

import { FilterQuery, FindOptions, RequiredEntityData } from '@mikro-orm/core';
import { BaseEntity } from '../entities';

/**
 * 分页结果接口
 */
export interface IPagination<T> {
  items: T[];
  total: number;
}

/**
 * CRUD 服务接口
 *
 * @template T - 实体类型，必须继承 BaseEntity
 */
export interface ICrudService<T extends BaseEntity> {
  /**
   * 统计实体数量
   *
   * @param filter - 过滤条件（可选）
   * @returns Promise<number> - 实体数量
   */
  count(filter?: FilterQuery<T>): Promise<number>;

  /**
   * 查找所有实体
   *
   * @param options - 查找选项（可选）
   * @returns Promise<IPagination<T>> - 分页结果
   */
  findAll(options?: FindOptions<T>): Promise<IPagination<T>>;

  /**
   * 根据 ID 查找单个实体
   *
   * @param id - 实体 ID
   * @param options - 查找选项（可选）
   * @returns Promise<T | null> - 实体或 null
   */
  findOneById(id: string, options?: FindOptions<T>): Promise<T | null>;

  /**
   * 创建实体
   *
   * @param entity - 实体数据
   * @returns Promise<T> - 创建的实体
   */
  create(entity: RequiredEntityData<T>): Promise<T>;

  /**
   * 更新实体
   *
   * @param id - 实体 ID
   * @param entity - 更新的实体数据
   * @returns Promise<T> - 更新后的实体
   */
  update(id: string, entity: Partial<T>): Promise<T>;

  /**
   * 删除实体
   *
   * @param id - 实体 ID
   * @returns Promise<void>
   */
  delete(id: string): Promise<void>;
}
