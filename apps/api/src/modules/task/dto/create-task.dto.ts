/**
 * 创建任务 DTO
 *
 * @description
 * 用于创建任务的请求数据传输对象。
 *
 * @package @oksai/api
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

/**
 * 创建任务 DTO
 */
export class CreateTaskDto {
  /**
   * 任务标题
   */
  @ApiProperty({ type: () => String, description: '任务标题', example: '完成项目文档' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title!: string;

  /**
   * 任务描述
   */
  @ApiPropertyOptional({ type: () => String, description: '任务描述', example: '编写项目的技术文档和 API 文档' })
  @IsOptional()
  @IsString()
  description?: string;

  /**
   * 任务状态
   */
  @ApiPropertyOptional({ type: () => String, enum: TaskStatus, description: '任务状态', default: TaskStatus.TODO })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  /**
   * 是否完成
   */
  @ApiPropertyOptional({ type: () => Boolean, description: '是否完成', default: false })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;

  /**
   * 优先级（1-5）
   */
  @ApiPropertyOptional({ type: () => Number, description: '优先级（1-5）', minimum: 1, maximum: 5, default: 3 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  priority?: number;

  /**
   * 截止日期
   */
  @ApiPropertyOptional({ type: () => String, format: 'date-time', description: '截止日期' })
  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
