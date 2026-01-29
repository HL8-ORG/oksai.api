/**
 * 验证管道
 *
 * @description
 * 全局验证管道，使用 class-validator 验证请求参数。
 *
 * @package @oksai/core
 */

import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

/**
 * 验证管道
 *
 * @description
 * 使用 class-validator 验证 DTO 对象。
 */
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  /**
   * 转换并验证数据
   *
   * @param value - 要验证的值
   * @param metadata - 参数元数据
   * @returns 验证后的值
   * @throws BadRequestException - 当验证失败时抛出
   */
  async transform(value: any, { metatype }: ArgumentMetadata) {
    // 如果没有元类型或不是需要验证的类型，直接返回
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // 将普通对象转换为类实例
    const object = plainToInstance(metatype, value);

    // 验证对象
    const errors = await validate(object);

    if (errors.length > 0) {
      // 提取错误消息
      const messages = errors.map((error) => {
        return Object.values(error.constraints || {}).join(', ');
      });

      throw new BadRequestException(messages.join('; '));
    }

    return value;
  }

  /**
   * 判断是否需要验证
   *
   * @param metatype - 元类型
   * @returns 是否需要验证
   */
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
