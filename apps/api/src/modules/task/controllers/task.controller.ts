/**
 * Task 控制器
 *
 * @description
 * 提供任务相关的 REST API 端点。
 *
 * @package @oksai/api
 */

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@oksai/auth';
import { RequestContext } from '@oksai/core';
import { CreateTaskDto, UpdateTaskDto } from '../dto';
import { CreateTaskCommand, UpdateTaskCommand, DeleteTaskCommand } from '../commands';
import { GetTaskQuery, ListTasksQuery } from '../queries';
import { Task, TaskStatus } from '../entities/task.entity';

/**
 * Task 控制器
 *
 * @description
 * 提供任务的 CRUD REST API。
 */
@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TaskController {
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
   * 创建任务
   *
   * @description
   * 创建新任务。
   *
   * @param createTaskDto - 创建任务数据
   * @returns Promise<Task> - 创建的任务实体
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '创建任务', description: '创建新任务' })
  @ApiResponse({ status: 201, description: '任务创建成功', type: Task })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 401, description: '未授权' })
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    const command = new CreateTaskCommand(
      createTaskDto,
      RequestContext.getTenantId() || '',
      RequestContext.getOrganizationId(),
    );
    return this.commandBus.execute(command);
  }

  /**
   * 获取任务列表
   *
   * @description
   * 获取任务列表，支持状态和完成状态过滤。
   *
   * @param status - 状态过滤（可选）
   * @param isCompleted - 是否完成过滤（可选）
   * @param page - 页码（可选）
   * @param limit - 每页数量（可选）
   * @returns Promise<Task[]> - 任务列表
   */
  @Get()
  @ApiOperation({ summary: '获取任务列表', description: '获取任务列表，支持状态和完成状态过滤' })
  @ApiResponse({ status: 200, description: '获取成功', type: [Task] })
  @ApiResponse({ status: 401, description: '未授权' })
  async findAll(
    @Query('status') status?: TaskStatus,
    @Query('isCompleted') isCompleted?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<Task[]> {
    const query = new ListTasksQuery(
      RequestContext.getTenantId() || '',
      RequestContext.getOrganizationId(),
      status,
      isCompleted === 'true' ? true : isCompleted === 'false' ? false : undefined,
      page ? parseInt(page, 10) : undefined,
      limit ? parseInt(limit, 10) : undefined,
    );
    return this.queryBus.execute(query);
  }

  /**
   * 获取单个任务
   *
   * @description
   * 根据 ID 获取单个任务。
   *
   * @param id - 任务 ID
   * @returns Promise<Task> - 任务实体
   */
  @Get(':id')
  @ApiOperation({ summary: '获取任务', description: '根据 ID 获取单个任务' })
  @ApiResponse({ status: 200, description: '获取成功', type: Task })
  @ApiResponse({ status: 404, description: '任务不存在' })
  @ApiResponse({ status: 401, description: '未授权' })
  async findOne(@Param('id') id: string): Promise<Task | null> {
    const query = new GetTaskQuery(
      id,
      RequestContext.getTenantId() || '',
      RequestContext.getOrganizationId(),
    );
    return this.queryBus.execute(query);
  }

  /**
   * 更新任务
   *
   * @description
   * 更新任务信息。
   *
   * @param id - 任务 ID
   * @param updateTaskDto - 更新任务数据
   * @returns Promise<Task> - 更新后的任务实体
   */
  @Put(':id')
  @ApiOperation({ summary: '更新任务', description: '更新任务信息' })
  @ApiResponse({ status: 200, description: '更新成功', type: Task })
  @ApiResponse({ status: 404, description: '任务不存在' })
  @ApiResponse({ status: 401, description: '未授权' })
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    const command = new UpdateTaskCommand(
      id,
      updateTaskDto,
      RequestContext.getTenantId() || '',
      RequestContext.getOrganizationId(),
    );
    return this.commandBus.execute(command);
  }

  /**
   * 删除任务
   *
   * @description
   * 删除任务。
   *
   * @param id - 任务 ID
   * @returns Promise<void>
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '删除任务', description: '删除任务' })
  @ApiResponse({ status: 204, description: '删除成功' })
  @ApiResponse({ status: 404, description: '任务不存在' })
  @ApiResponse({ status: 401, description: '未授权' })
  async remove(@Param('id') id: string): Promise<void> {
    const command = new DeleteTaskCommand(
      id,
      RequestContext.getTenantId() || '',
      RequestContext.getOrganizationId(),
    );
    return this.commandBus.execute(command);
  }
}
