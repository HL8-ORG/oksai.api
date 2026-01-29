/**
 * 认证控制器
 *
 * @description
 * 提供用户认证相关的 REST API 端点。
 *
 * @package @oksai/api
 */

import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService, LoginResponse } from '@oksai/auth';
import { Public } from '@oksai/auth';
import { LoginDto, RegisterDto } from '../dto';

/**
 * 认证控制器
 *
 * @description
 * 提供用户登录、注册等认证功能。
 */
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  /**
   * 构造函数
   *
   * @param authService - 认证服务
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * 用户登录
   *
   * @description
   * 验证用户凭据并返回 JWT Token。
   *
   * @param loginDto - 登录数据
   * @returns Promise<LoginResponse> - 登录响应，包含 Token 和用户信息
   */
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '用户登录', description: '使用邮箱和密码登录，返回 JWT Token' })
  @ApiResponse({
    status: 200,
    description: '登录成功',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 200 },
        message: { type: 'string', example: 'success' },
        data: {
          type: 'object',
          properties: {
            accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
            user: {
              type: 'object',
              properties: {
                id: { type: 'string', example: 'uuid' },
                email: { type: 'string', example: 'user@example.com' },
                firstName: { type: 'string', example: 'John' },
                lastName: { type: 'string', example: 'Doe' },
              },
            },
          },
        },
        timestamp: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
      },
    },
  })
  @ApiResponse({ status: 401, description: '无效的邮箱或密码' })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return await this.authService.login(loginDto.email, loginDto.password);
  }

  /**
   * 用户注册
   *
   * @description
   * 创建新用户账户。
   *
   * @param registerDto - 注册数据
   * @returns Promise<any> - 注册响应
   */
  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '用户注册', description: '创建新用户账户' })
  @ApiResponse({
    status: 201,
    description: '注册成功',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 201 },
        message: { type: 'string', example: 'success' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'uuid' },
            email: { type: 'string', example: 'user@example.com' },
            firstName: { type: 'string', example: 'John' },
            lastName: { type: 'string', example: 'Doe' },
          },
        },
        timestamp: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
      },
    },
  })
  @ApiResponse({ status: 400, description: '注册失败，邮箱可能已被使用' })
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(
      registerDto.email,
      registerDto.password,
      registerDto.firstName,
      registerDto.lastName,
    );

    // 返回用户信息（排除密码哈希）
    const { hash: _hash, ...userInfo } = user;
    return userInfo;
  }
}
