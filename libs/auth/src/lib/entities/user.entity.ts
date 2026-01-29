/**
 * 用户实体
 *
 * @description
 * 系统核心用户实体，继承 TenantBaseEntity 实现多租户隔离。
 * 包含用户的基本信息、认证信息等。
 *
 * @package @oksai/auth
 */

import { ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { TenantBaseEntity } from '@oksai/core';
import { MultiORMColumn, MultiORMEntity } from '@oksai/core';

/**
 * 用户实体类
 *
 * @description
 * 系统核心用户实体，继承 TenantBaseEntity 实现多租户隔离。
 */
@MultiORMEntity('user')
export class User extends TenantBaseEntity {
  /**
   * 邮箱地址（唯一）
   */
  @ApiPropertyOptional({ type: () => String })
  @IsEmail()
  @IsOptional()
  @MultiORMColumn({ unique: true, nullable: false })
  email!: string;

  /**
   * 密码哈希（排除在序列化中）
   */
  @Exclude()
  @IsString()
  @IsOptional()
  @MultiORMColumn({ nullable: true })
  hash?: string;

  /**
   * 名字
   */
  @ApiPropertyOptional({ type: () => String })
  @IsString()
  @IsOptional()
  @MultiORMColumn({ nullable: true })
  firstName?: string;

  /**
   * 姓氏
   */
  @ApiPropertyOptional({ type: () => String })
  @IsString()
  @IsOptional()
  @MultiORMColumn({ nullable: true })
  lastName?: string;

  /**
   * 用户名
   */
  @ApiPropertyOptional({ type: () => String })
  @IsString()
  @IsOptional()
  @MultiORMColumn({ nullable: true, unique: true })
  username?: string;

  /**
   * 头像 URL
   */
  @ApiPropertyOptional({ type: () => String })
  @IsString()
  @IsOptional()
  @MultiORMColumn({ nullable: true })
  imageUrl?: string;

  /**
   * 最后登录时间
   */
  @ApiPropertyOptional({ type: () => Date })
  @IsOptional()
  @MultiORMColumn({ type: 'timestamp', nullable: true })
  lastLoginAt?: Date;
}
