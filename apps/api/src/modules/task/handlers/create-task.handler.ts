/**
 * 创建任务命令处理器
 *
 * @description
 * 处理 CreateTaskCommand 命令。
 *
 * @package @oksai/api
 */

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TaskService } from '../services/task.service';
import { CreateTaskCommand } from '../commands/create-task.command';
import { Task } from '../entities/task.entity';

/**
 * 创建任务命令处理器
 */
@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand, Task> {
  /**
   * 构造函数
   *
   * @param taskService - Task 服务
   */
  constructor(private readonly taskService: TaskService) {}

  /**
   * 执行创建任务命令
   *
   * @param command - 创建任务命令
   * @returns Promise<Task> - 创建的任务实体
   */
  async execute(command: CreateTaskCommand): Promise<Task> {
    return this.taskService.createTask(command.data);
  }
}
