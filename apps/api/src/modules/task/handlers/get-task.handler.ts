/**
 * 获取任务查询处理器
 *
 * @description
 * 处理 GetTaskQuery 查询。
 *
 * @package @oksai/api
 */

import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { TaskService } from '../services/task.service';
import { GetTaskQuery, GetTaskQueryResult } from '../queries/get-task.query';

/**
 * 获取任务查询处理器
 */
@QueryHandler(GetTaskQuery)
export class GetTaskHandler implements IQueryHandler<GetTaskQuery, GetTaskQueryResult> {
  /**
   * 构造函数
   *
   * @param taskService - Task 服务
   */
  constructor(private readonly taskService: TaskService) {}

  /**
   * 执行获取任务查询
   *
   * @param query - 获取任务查询
   * @returns Promise<GetTaskQueryResult> - 任务实体或 null
   */
  async execute(query: GetTaskQuery): Promise<GetTaskQueryResult> {
    return this.taskService.findOneById(query.id);
  }
}
