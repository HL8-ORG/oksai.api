/**
 * 删除任务命令处理器
 *
 * @description
 * 处理 DeleteTaskCommand 命令。
 *
 * @package @oksai/api
 */

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TaskService } from '../services/task.service';
import { DeleteTaskCommand } from '../commands/delete-task.command';

/**
 * 删除任务命令处理器
 */
@CommandHandler(DeleteTaskCommand)
export class DeleteTaskHandler implements ICommandHandler<DeleteTaskCommand, void> {
  /**
   * 构造函数
   *
   * @param taskService - Task 服务
   */
  constructor(private readonly taskService: TaskService) {}

  /**
   * 执行删除任务命令
   *
   * @param command - 删除任务命令
   * @returns Promise<void>
   */
  async execute(command: DeleteTaskCommand): Promise<void> {
    return this.taskService.delete(command.id);
  }
}
