/**
 * 获取任务查询
 *
 * @description
 * CQRS 查询：根据 ID 获取单个任务。
 *
 * @package @oksai/api
 */

import { BaseQuery } from '@oksai/core';
import { Task } from '../entities/task.entity';

/**
 * 获取任务查询结果类型
 */
export type GetTaskQueryResult = Task | null;

/**
 * 获取任务查询
 */
export class GetTaskQuery extends BaseQuery<GetTaskQueryResult> {
  /**
   * 任务 ID
   */
  public readonly id: string;

  /**
   * 租户 ID
   */
  public readonly tenantId: string;

  /**
   * 组织 ID（可选）
   */
  public readonly organizationId?: string;

  /**
   * 构造函数
   *
   * @param id - 任务 ID
   * @param tenantId - 租户 ID
   * @param organizationId - 组织 ID（可选）
   */
  constructor(id: string, tenantId: string, organizationId?: string) {
    super();
    this.id = id;
    this.tenantId = tenantId;
    this.organizationId = organizationId;
  }
}
