/**
 * 任务更新事件
 *
 * @description
 * 当任务被更新时发布此事件。
 *
 * @package @oksai/api
 */

import { BaseEvent } from '@oksai/core';
import { Task } from '../entities/task.entity';

/**
 * 任务更新事件
 */
export class TaskUpdatedEvent extends BaseEvent {
  /**
   * 任务实体
   */
  public readonly task: Task;

  /**
   * 构造函数
   *
   * @param task - 更新的任务实体
   */
  constructor(task: Task) {
    super();
    this.task = task;
  }
}
