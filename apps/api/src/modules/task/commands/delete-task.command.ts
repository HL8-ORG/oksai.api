/**
 * 删除任务命令
 *
 * @description
 * CQRS 命令：删除任务。
 *
 * @package @oksai/api
 */

import { BaseCommand } from '@oksai/core';

/**
 * 删除任务命令
 */
export class DeleteTaskCommand extends BaseCommand {
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
