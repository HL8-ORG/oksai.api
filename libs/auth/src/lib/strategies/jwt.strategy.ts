/**
 * JWT 认证策略
 *
 * @description
 * 实现 Passport JWT 认证策略，用于验证 JWT Token。
 *
 * @package @oksai/auth
 */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '../entities';
import { JwtPayload } from '../services/auth.service';

/**
 * JWT 认证策略
 *
 * @description
 * 实现 Passport JWT 认证策略。
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * 构造函数
   *
   * @param userRepository - 用户仓库
   */
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
    });
  }

  /**
   * 验证 JWT 载荷
   *
   * @description
   * 从 JWT 载荷中提取用户信息并返回用户对象。
   *
   * @param payload - JWT 载荷
   * @returns Promise<User> - 用户对象
   * @throws UnauthorizedException - 当用户不存在时抛出
   */
  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.userRepository.findOne({ id: payload.sub });

    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }

    return user;
  }
}
