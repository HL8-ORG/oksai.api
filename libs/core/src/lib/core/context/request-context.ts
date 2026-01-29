/**
 * 请求上下文
 *
 * @description
 * 管理每个 HTTP 请求的上下文信息，包括租户、用户、组织等。
 * 使用 nestjs-cls 实现异步本地存储，支持异步操作。
 *
 * @package @oksai/core
 */

import { Request, Response } from 'express';
import { ClsService } from 'nestjs-cls';
import { CLS_ID } from 'nestjs-cls';

/**
 * 请求上下文类
 *
 * @description
 * 存储和管理当前请求的上下文信息。
 */
export class RequestContext {
  /**
   * CLS 服务实例（静态）
   */
  protected static clsService: ClsService;

  /**
   * 上下文 ID
   */
  private readonly _id: string;

  /**
   * HTTP 请求对象
   */
  private readonly _req?: Request;

  /**
   * HTTP 响应对象
   */
  private readonly _res?: Response;

  /**
   * 构造函数
   *
   * @param options - 上下文选项
   * @param options.id - 上下文 ID（可选，默认生成 UUID）
   * @param options.req - HTTP 请求对象（可选）
   * @param options.res - HTTP 响应对象（可选）
   */
  constructor(options: {
    id?: string;
    req?: Request;
    res?: Response;
  } = {}) {
    // 设置上下文 ID
    const contextId = options.id || crypto.randomUUID();
    RequestContext.setContextId(contextId);

    // 赋值实例属性
    this._id = contextId;
    this._req = options.req;
    this._res = options.res;
  }

  /**
   * 获取上下文 ID
   */
  get id(): string {
    return this._id;
  }

  /**
   * 获取 HTTP 请求对象
   */
  get req(): Request | undefined {
    return this._req;
  }

  /**
   * 获取 HTTP 响应对象
   */
  get res(): Response | undefined {
    return this._res;
  }

  /**
   * 设置 CLS 服务实例
   *
   * @param service - CLS 服务实例
   */
  static setClsService(service: ClsService): void {
    RequestContext.clsService = service;
  }

  /**
   * 设置上下文 ID
   *
   * @param id - 上下文 ID
   */
  static setContextId(id: string): void {
    if (RequestContext.clsService) {
      RequestContext.clsService.set(CLS_ID, id);
    }
  }

  /**
   * 获取上下文 ID
   *
   * @returns 上下文 ID 或 undefined
   */
  static getContextId(): string | undefined {
    if (RequestContext.clsService) {
      return RequestContext.clsService.get(CLS_ID);
    }
    return undefined;
  }

  /**
   * 获取当前请求上下文
   *
   * @returns 当前 RequestContext 实例
   */
  static currentRequestContext(): RequestContext | undefined {
    if (RequestContext.clsService) {
      return RequestContext.clsService.get(RequestContext.name);
    }
    return undefined;
  }

  /**
   * 获取当前请求对象
   *
   * @returns 当前 HTTP 请求对象
   */
  static currentRequest(): Request | undefined {
    const context = RequestContext.currentRequestContext();
    return context?.req;
  }

  /**
   * 获取当前响应对象
   *
   * @returns 当前 HTTP 响应对象
   */
  static currentResponse(): Response | undefined {
    const context = RequestContext.currentRequestContext();
    return context?.res;
  }

  /**
   * 获取租户 ID（从请求头）
   *
   * @returns 租户 ID 或 undefined
   */
  static getTenantId(): string | undefined {
    const req = RequestContext.currentRequest();
    return req?.headers['tenant-id'] as string | undefined;
  }

  /**
   * 获取组织 ID（从请求头）
   *
   * @returns 组织 ID 或 undefined
   */
  static getOrganizationId(): string | undefined {
    const req = RequestContext.currentRequest();
    return req?.headers['organization-id'] as string | undefined;
  }
}
