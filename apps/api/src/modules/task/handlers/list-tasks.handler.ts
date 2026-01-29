/**
 * 列表任务查询处理器
 *
 * @description
 * 处理 ListTasksQuery 查询。
 *
 * @package @oksai/api
 */

import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { TaskService } from '../services/task.service';
import { ListTasksQuery, ListTasksQueryResult } from '../queries/list-tasks.query';

/**
 * 列表任务查询处理器
 */
@QueryHandler(ListTasksQuery)
export class ListTasksHandler implements IQueryHandler<ListTasksQuery, ListTasksQueryResult> {
  /**
   * 构造函数
   *
   * @param taskService - Task 服务
   */
  constructor(private readonly taskService: TaskService) {}

  /**
   * 执行列表任务查询
   *
   * @param query - 列表任务查询
   * @returns Promise<ListTasksQueryResult> - 任务列表
   */
  async execute(query: ListTasksQuery): Promise<ListTasksQueryResult> {
    const filter: Record<string, unknown> = {};

    if (query.status) {
      filter.status = query.status;
    }

    if (query.isCompleted !== undefined) {
      filter.isCompleted = query.isCompleted;
    }

    return this.taskService.findAll(filter);
  }
}
