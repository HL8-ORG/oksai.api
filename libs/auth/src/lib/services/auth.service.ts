/**
 * 认证服务
 *
 * @description
 * 提供用户认证相关功能，包括登录、注册、Token 生成等。
 *
 * @package @oksai/auth
 */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import * as bcrypt from 'bcrypt';
import { User } from '../entities';

/**
 * 登录响应接口
 */
export interface LoginResponse {
  /**
   * 访问令牌
   */
  accessToken: string;

  /**
   * 刷新令牌
   */
  refreshToken?: string;

  /**
   * 用户信息
   */
  user: Partial<User>;
}

/**
 * JWT 载荷接口
 */
export interface JwtPayload {
  /**
   * 用户 ID
   */
  sub: string;

  /**
   * 邮箱
   */
  email: string;

  /**
   * 租户 ID
   */
  tenantId?: string;
}

/**
 * 认证服务
 *
 * @description
 * 提供用户认证相关功能。
 */
@Injectable()
export class AuthService {
  /**
   * 构造函数
   *
   * @param userRepository - 用户仓库
   * @param jwtService - JWT 服务
   */
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly jwtService: JwtService,
    private readonly em: EntityManager,
  ) {}

  /**
   * 验证用户
   *
   * @description
   * 根据邮箱和密码验证用户身份。
   *
   * @param email - 用户邮箱
   * @param password - 用户密码
   * @returns Promise<User | null> - 验证成功返回用户，失败返回 null
   */
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ email });

    if (!user || !user.hash) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.hash);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  /**
   * 登录
   *
   * @description
   * 验证用户凭据并生成 JWT Token。
   *
   * @param email - 用户邮箱
   * @param password - 用户密码
   * @returns Promise<LoginResponse> - 登录响应，包含 Token 和用户信息
   * @throws UnauthorizedException - 当凭据无效时抛出
   */
  async login(email: string, password: string): Promise<LoginResponse> {
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('无效的邮箱或密码');
    }

    // 更新最后登录时间
    user.lastLoginAt = new Date();
    await this.em.flush();

    // 生成 JWT Token
    const payload: JwtPayload = {
      sub: user.id!,
      email: user.email,
      tenantId: user.tenantId,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        imageUrl: user.imageUrl,
      },
    };
  }

  /**
   * 注册
   *
   * @description
   * 创建新用户账户。
   *
   * @param email - 用户邮箱
   * @param password - 用户密码
   * @param firstName - 名字（可选）
   * @param lastName - 姓氏（可选）
   * @returns Promise<User> - 创建的用户
   */
  async register(
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
  ): Promise<User> {
    // 检查用户是否已存在
    const existingUser = await this.userRepository.findOne({ email });
    if (existingUser) {
      throw new UnauthorizedException('该邮箱已被注册');
    }

    // 加密密码
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    // 创建新用户
    const user = this.userRepository.create({
      email,
      hash,
      firstName,
      lastName,
    });

    this.em.persist(user);
    await this.em.flush();

    return user;
  }

  /**
   * 验证 JWT Token
   *
   * @description
   * 验证并解析 JWT Token。
   *
   * @param token - JWT Token
   * @returns Promise<JwtPayload> - JWT 载荷
   */
  async verifyToken(token: string): Promise<JwtPayload> {
    try {
      return this.jwtService.verify<JwtPayload>(token);
    } catch {
      throw new UnauthorizedException('无效的 Token');
    }
  }
}
