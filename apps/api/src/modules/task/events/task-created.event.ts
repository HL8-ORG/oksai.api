/**
 * 任务创建事件
 *
 * @description
 * 当任务被创建时发布此事件。
 *
 * @package @oksai/api
 */

import { BaseEvent } from '@oksai/core';
import { Task } from '../entities/task.entity';

/**
 * 任务创建事件
 */
export class TaskCreatedEvent extends BaseEvent {
  /**
   * 任务实体
   */
  public readonly task: Task;

  /**
   * 构造函数
   *
   * @param task - 创建的任务实体
   */
  constructor(task: Task) {
    super();
    this.task = task;
  }
}
