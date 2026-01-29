/**
 * 创建任务命令
 *
 * @description
 * CQRS 命令：创建新任务。
 *
 * @package @oksai/api
 */

import { BaseCommand } from '@oksai/core';
import { CreateTaskDto } from '../dto/create-task.dto';

/**
 * 创建任务命令
 */
export class CreateTaskCommand extends BaseCommand {
  /**
   * 任务数据
   */
  public readonly data: CreateTaskDto;

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
   * @param data - 任务数据
   * @param tenantId - 租户 ID
   * @param organizationId - 组织 ID（可选）
   */
  constructor(data: CreateTaskDto, tenantId: string, organizationId?: string) {
    super();
    this.data = data;
    this.tenantId = tenantId;
    this.organizationId = organizationId;
  }
}
