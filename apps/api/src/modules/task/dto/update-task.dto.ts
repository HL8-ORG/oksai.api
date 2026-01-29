/**
 * 更新任务 DTO
 *
 * @description
 * 用于更新任务的请求数据传输对象。
 *
 * @package @oksai/api
 */

import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';

/**
 * 更新任务 DTO
 */
export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
