/**
 * 更新任务命令处理器
 *
 * @description
 * 处理 UpdateTaskCommand 命令。
 *
 * @package @oksai/api
 */

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TaskService } from '../services/task.service';
import { UpdateTaskCommand } from '../commands/update-task.command';
import { Task } from '../entities/task.entity';

/**
 * 更新任务命令处理器
 */
@CommandHandler(UpdateTaskCommand)
export class UpdateTaskHandler implements ICommandHandler<UpdateTaskCommand, Task> {
  /**
   * 构造函数
   *
   * @param taskService - Task 服务
   */
  constructor(private readonly taskService: TaskService) {}

  /**
   * 执行更新任务命令
   *
   * @param command - 更新任务命令
   * @returns Promise<Task> - 更新后的任务实体
   */
  async execute(command: UpdateTaskCommand): Promise<Task> {
    return this.taskService.updateTask(command.id, command.data);
  }
}
