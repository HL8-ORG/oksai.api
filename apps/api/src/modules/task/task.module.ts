/**
 * Task 模块
 *
 * @description
 * 提供任务相关的功能模块，包括实体、服务、控制器、Resolver 和 CQRS 处理器。
 *
 * @package @oksai/api
 */

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DatabaseModule, EventBusModule } from '@oksai/core';
import { Task } from './entities/task.entity';
import { TaskService } from './services/task.service';
import { TaskController } from './controllers/task.controller';
import { TaskResolver } from './resolvers/task.resolver';
import {
  CreateTaskHandler,
  UpdateTaskHandler,
  DeleteTaskHandler,
  GetTaskHandler,
  ListTasksHandler,
} from './handlers';

/**
 * Task 模块
 *
 * @description
 * 提供任务的完整功能，包括 CRUD、CQRS 和事件发布。
 */
@Module({
  imports: [
    CqrsModule,
    DatabaseModule,
    EventBusModule,
    MikroOrmModule.forFeature([Task]),
  ],
  controllers: [TaskController],
  providers: [
    TaskService,
    TaskResolver,
    // CQRS 处理器
    CreateTaskHandler,
    UpdateTaskHandler,
    DeleteTaskHandler,
    GetTaskHandler,
    ListTasksHandler,
  ],
  exports: [TaskService],
})
export class TaskModule {}
