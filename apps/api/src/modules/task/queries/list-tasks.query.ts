/**
 * 列表任务查询
 *
 * @description
 * CQRS 查询：获取任务列表。
 *
 * @package @oksai/api
 */

import { BaseQuery } from '@oksai/core';
import { Task, TaskStatus } from '../entities/task.entity';

/**
 * 列表任务查询结果类型
 */
export type ListTasksQueryResult = Task[];

/**
 * 列表任务查询
 */
export class ListTasksQuery extends BaseQuery<ListTasksQueryResult> {
  /**
   * 租户 ID
   */
  public readonly tenantId: string;

  /**
   * 组织 ID（可选）
   */
  public readonly organizationId?: string;

  /**
   * 状态过滤（可选）
   */
  public readonly status?: TaskStatus;

  /**
   * 是否完成过滤（可选）
   */
  public readonly isCompleted?: boolean;

  /**
   * 页码
   */
  public readonly page?: number;

  /**
   * 每页数量
   */
  public readonly limit?: number;

  /**
   * 构造函数
   *
   * @param tenantId - 租户 ID
   * @param organizationId - 组织 ID（可选）
   * @param status - 状态过滤（可选）
   * @param isCompleted - 是否完成过滤（可选）
   * @param page - 页码
   * @param limit - 每页数量
   */
  constructor(
    tenantId: string,
    organizationId?: string,
    status?: TaskStatus,
    isCompleted?: boolean,
    page?: number,
    limit?: number,
  ) {
    super();
    this.tenantId = tenantId;
    this.organizationId = organizationId;
    this.status = status;
    this.isCompleted = isCompleted;
    this.page = page;
    this.limit = limit;
  }
}
