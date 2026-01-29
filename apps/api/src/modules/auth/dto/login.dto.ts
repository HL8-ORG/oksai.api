/**
 * 登录 DTO
 *
 * @description
 * 用户登录请求的数据传输对象。
 *
 * @package @oksai/api
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * 登录 DTO
 *
 * @description
 * 用户登录请求的数据传输对象。
 */
export class LoginDto {
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
}
