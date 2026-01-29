/**
 * 注册 DTO
 *
 * @description
 * 用户注册请求的数据传输对象。
 *
 * @package @oksai/api
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

/**
 * 注册 DTO
 *
 * @description
 * 用户注册请求的数据传输对象。
 */
export class RegisterDto {
  /**
   * 用户邮箱
   */
  @ApiProperty({
    description: '用户邮箱地址',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: '请输入有效的邮箱地址' })
  @IsNotEmpty({ message: '邮箱不能为空' })
  email: string;

  /**
   * 用户密码
   */
  @ApiProperty({
    description: '用户密码',
    example: 'password123',
    minLength: 6,
  })
  @IsString({ message: '密码必须是字符串' })
  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6, { message: '密码长度至少为 6 位' })
  password: string;

  /**
   * 名字
   */
  @ApiPropertyOptional({
    description: '用户名字',
    example: 'John',
  })
  @IsOptional()
  @IsString({ message: '名字必须是字符串' })
  firstName?: string;

  /**
   * 姓氏
   */
  @ApiPropertyOptional({
    description: '用户姓氏',
    example: 'Doe',
  })
  @IsOptional()
  @IsString({ message: '姓氏必须是字符串' })
  lastName?: string;
}
