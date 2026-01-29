/**
 * 更新任务命令
 *
 * @description
 * CQRS 命令：更新任务。
 *
 * @package @oksai/api
 */

import { BaseCommand } from '@oksai/core';
import { UpdateTaskDto } from '../dto/update-task.dto';

/**
 * 更新任务命令
 */
export class UpdateTaskCommand extends BaseCommand {
  /**
   * 任务 ID
   */
  public readonly id: string;

  /**
   * 更新数据
   */
  public readonly data: UpdateTaskDto;

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
   * @param data - 更新数据
   * @param tenantId - 租户 ID
   * @param organizationId - 组织 ID（可选）
   */
  constructor(id: string, data: UpdateTaskDto, tenantId: string, organizationId?: string) {
    super();
    this.id = id;
    this.data = data;
    this.tenantId = tenantId;
    this.organizationId = organizationId;
  }
}
