/**
 * Task GraphQL Resolver
 *
 * @description
 * 提供任务相关的 GraphQL API。
 *
 * @package @oksai/api
 */

import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@oksai/auth';
import { RequestContext } from '@oksai/core';
import { Task, TaskStatus } from '../entities/task.entity';
import { CreateTaskDto, UpdateTaskDto } from '../dto';
import { CreateTaskCommand, UpdateTaskCommand, DeleteTaskCommand } from '../commands';
import { GetTaskQuery, ListTasksQuery } from '../queries';

/**
 * Task GraphQL Resolver
 *
 * @description
 * 提供任务的 GraphQL 查询和变更操作。
 */
@Resolver(() => Task)
@UseGuards(JwtAuthGuard)
export class TaskResolver {
  /**
   * 构造函数
   *
   * @param commandBus - 命令总线
   * @param queryBus - 查询总线
   */
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**
   * 获取任务列表
   *
   * @description
   * GraphQL 查询：获取任务列表。
   *
   * @param status - 状态过滤（可选）
   * @param isCompleted - 是否完成过滤（可选）
   * @returns Promise<Task[]> - 任务列表
   */
  @Query(() => [Task], { name: 'tasks', description: '获取任务列表' })
  async getTasks(
    @Args('status', { type: () => TaskStatus, nullable: true }) status?: TaskStatus,
    @Args('isCompleted', { type: () => Boolean, nullable: true }) isCompleted?: boolean,
  ): Promise<Task[]> {
    const query = new ListTasksQuery(
      RequestContext.getTenantId() || '',
      RequestContext.getOrganizationId(),
      status,
      isCompleted,
    );
    return this.queryBus.execute(query);
  }

  /**
   * 获取单个任务
   *
   * @description
   * GraphQL 查询：根据 ID 获取单个任务。
   *
   * @param id - 任务 ID
   * @returns Promise<Task | null> - 任务实体或 null
   */
  @Query(() => Task, { name: 'task', nullable: true, description: '获取单个任务' })
  async getTask(@Args('id', { type: () => ID }) id: string): Promise<Task | null> {
    const query = new GetTaskQuery(
      id,
      RequestContext.getTenantId() || '',
      RequestContext.getOrganizationId(),
    );
    return this.queryBus.execute(query);
  }

  /**
   * 创建任务
   *
   * @description
   * GraphQL 变更：创建新任务。
   *
   * @param input - 创建任务数据
   * @returns Promise<Task> - 创建的任务实体
   */
  @Mutation(() => Task, { name: 'createTask', description: '创建任务' })
  async createTask(@Args('input') input: CreateTaskDto): Promise<Task> {
    const command = new CreateTaskCommand(
      input,
      RequestContext.getTenantId() || '',
      RequestContext.getOrganizationId(),
    );
    return this.commandBus.execute(command);
  }

  /**
   * 更新任务
   *
   * @description
   * GraphQL 变更：更新任务。
   *
   * @param id - 任务 ID
   * @param input - 更新任务数据
   * @returns Promise<Task> - 更新后的任务实体
   */
  @Mutation(() => Task, { name: 'updateTask', description: '更新任务' })
  async updateTask(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateTaskDto,
  ): Promise<Task> {
    const command = new UpdateTaskCommand(
      id,
      input,
      RequestContext.getTenantId() || '',
      RequestContext.getOrganizationId(),
    );
    return this.commandBus.execute(command);
  }

  /**
   * 删除任务
   *
   * @description
   * GraphQL 变更：删除任务。
   *
   * @param id - 任务 ID
   * @returns Promise<boolean> - 删除是否成功
   */
  @Mutation(() => Boolean, { name: 'deleteTask', description: '删除任务' })
  async deleteTask(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    const command = new DeleteTaskCommand(
      id,
      RequestContext.getTenantId() || '',
      RequestContext.getOrganizationId(),
    );
    await this.commandBus.execute(command);
    return true;
  }
}
