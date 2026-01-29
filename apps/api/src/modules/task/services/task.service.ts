/**
 * Task 服务
 *
 * @description
 * 提供任务的业务逻辑处理，包括 CRUD 操作和事件发布。
 *
 * @package @oksai/api
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager, RequiredEntityData } from '@mikro-orm/core';
import { TenantAwareCrudService, RequestContext, EventBus } from '@oksai/core';
import { Task, TaskStatus } from '../entities/task.entity';
import { CreateTaskDto, UpdateTaskDto } from '../dto';
import { TaskCreatedEvent, TaskUpdatedEvent, TaskDeletedEvent } from '../events';

/**
 * Task 服务
 *
 * @description
 * 继承 TenantAwareCrudService 提供多租户支持的 CRUD 操作。
 */
@Injectable()
export class TaskService extends TenantAwareCrudService<Task> {
  /**
   * 构造函数
   *
   * @param taskRepository - Task 实体仓库
   * @param em - 实体管理器
   * @param eventBus - 事件总线
   */
  constructor(
    @InjectRepository(Task)
    taskRepository: EntityRepository<Task>,
    em: EntityManager,
    private readonly eventBus: EventBus,
  ) {
    super(taskRepository, em);
  }

  /**
   * 创建任务
   *
   * @description
   * 创建新任务并发布 TaskCreatedEvent 事件。
   * 重写基类方法以支持 DTO 和事件发布。
   *
   * @param createTaskDto - 创建任务数据
   * @returns Promise<Task> - 创建的任务实体
   */
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const tenantId = RequestContext.getTenantId();
    const organizationId = RequestContext.getOrganizationId();

    if (!tenantId) {
      throw new Error('租户 ID 不能为空');
    }

    // 转换 DTO 为实体数据
    const entityData: RequiredEntityData<Task> = {
      title: createTaskDto.title,
      description: createTaskDto.description || undefined,
      status: createTaskDto.status || TaskStatus.TODO,
      isCompleted: createTaskDto.isCompleted || false,
      priority: createTaskDto.priority || 3,
      tenantId,
      organizationId: organizationId || undefined,
      ...(createTaskDto.dueDate && { dueDate: new Date(createTaskDto.dueDate) }),
    };

    // 调用基类的 create 方法
    const task = await super.create(entityData);

    // 发布任务创建事件
    await this.eventBus.publish(new TaskCreatedEvent(task));

    return task;
  }

  /**
   * 更新任务
   *
   * @description
   * 更新任务并发布 TaskUpdatedEvent 事件。
   * 重写基类方法以支持 DTO 和事件发布。
   *
   * @param id - 任务 ID
   * @param updateTaskDto - 更新任务数据
   * @returns Promise<Task> - 更新后的任务实体
   */
  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const tenantId = RequestContext.getTenantId();

    if (!tenantId) {
      throw new Error('租户 ID 不能为空');
    }

    // 转换 DTO 为实体数据
    const entityData: Partial<Task> = {};

    if (updateTaskDto.title !== undefined) {
      entityData.title = updateTaskDto.title;
    }
    if (updateTaskDto.description !== undefined) {
      entityData.description = updateTaskDto.description || undefined;
    }
    if (updateTaskDto.status !== undefined) {
      entityData.status = updateTaskDto.status;
    }
    if (updateTaskDto.isCompleted !== undefined) {
      entityData.isCompleted = updateTaskDto.isCompleted;
    }
    if (updateTaskDto.priority !== undefined) {
      entityData.priority = updateTaskDto.priority;
    }
    if (updateTaskDto.dueDate !== undefined) {
      entityData.dueDate = updateTaskDto.dueDate ? new Date(updateTaskDto.dueDate) : undefined;
    }

    // 调用基类的 update 方法
    const task = await super.update(id, entityData);

    // 发布任务更新事件
    await this.eventBus.publish(new TaskUpdatedEvent(task));

    return task;
  }

  /**
   * 删除任务
   *
   * @description
   * 删除任务并发布 TaskDeletedEvent 事件。
   * 重写基类方法以支持事件发布。
   *
   * @param id - 任务 ID
   * @returns Promise<void>
   */
  async delete(id: string): Promise<void> {
    const tenantId = RequestContext.getTenantId();
    const organizationId = RequestContext.getOrganizationId();

    if (!tenantId) {
      throw new Error('租户 ID 不能为空');
    }

    // 调用基类的 delete 方法
    await super.delete(id);

    // 发布任务删除事件
    await this.eventBus.publish(new TaskDeletedEvent(id, tenantId, organizationId));
  }
}
