/**
 * 任务删除事件
 *
 * @description
 * 当任务被删除时发布此事件。
 *
 * @package @oksai/api
 */

import { BaseEvent } from '@oksai/core';

/**
 * 任务删除事件
 */
export class TaskDeletedEvent extends BaseEvent {
  /**
   * 任务 ID
   */
  public readonly taskId: string;

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
   * @param taskId - 删除的任务 ID
   * @param tenantId - 租户 ID
   * @param organizationId - 组织 ID（可选）
   */
  constructor(taskId: string, tenantId: string, organizationId?: string) {
    super();
    this.taskId = taskId;
    this.tenantId = tenantId;
    this.organizationId = organizationId;
  }
}
