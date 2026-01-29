/**
 * 事件总线
 *
 * @description
 * 提供发布-订阅模式的事件驱动架构基础设施。
 * 支持跨模块的事件通信，实现松耦合的业务逻辑。
 *
 * @package @oksai/core
 */

import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Observable, Subject, filter, takeUntil } from 'rxjs';
import { BaseEvent } from './base-event';

/**
 * 事件类型构造函数
 */
export type EventType<T extends BaseEvent> = new (...args: any[]) => T;

/**
 * 事件总线服务
 *
 * @description
 * 可注入的服务，提供事件发布和订阅功能。
 * 实现了 OnModuleDestroy 接口，确保在模块销毁时正确清理资源。
 *
 * @example
 * ```typescript
 * // 在服务中注入
 * constructor(private eventBus: EventBus) {}
 *
 * // 发布事件
 * await this.eventBus.publish(new TaskCreatedEvent(...));
 *
 * // 订阅事件
 * this.eventBus.ofType(TaskCreatedEvent).subscribe(task => {
 *   console.log('New task created:', task);
 * });
 * ```
 */
@Injectable()
export class EventBus implements OnModuleDestroy {
  /**
   * 事件主题
   *
   * @description
   * RxJS Subject，用于事件发布和订阅的核心机制。
   * 所有事件通过此 Subject 流动。
   */
  private event$: Subject<BaseEvent> = new Subject<BaseEvent>();

  /**
   * 销毁信号
   *
   * @description
   * 用于在模块销毁时通知所有订阅者取消订阅。
   */
  private onDestroy$: Subject<void> = new Subject<void>();

  /**
   * 构造函数
   *
   * @description
   * 初始化事件总线，无需额外配置。
   */
  constructor() {}

  /**
   * 发布单个事件
   *
   * @description
   * 将指定事件发布到事件总线，供所有订阅者接收。
   * 异步方法，返回 Promise 以支持事件处理的异步特性。
   *
   * @param event - 要发布的事件对象，必须继承 BaseEvent
   * @returns Promise<void> - 事件发布完成的 Promise
   *
   * @example
   * ```typescript
   * // 发布任务创建事件
   * await this.eventBus.publish(new TaskCreatedEvent({
   *   taskId: 'task-123',
   *   title: 'New Task'
   * }));
   * ```
   */
  async publish<T extends BaseEvent>(event: T): Promise<void> {
    this.event$.next(event);
  }

  /**
   * 发布多个事件
   *
   * @description
   * 按顺序发布多个事件到事件总线。
   *
   * @param events - 要发布的事件数组
   * @returns Promise<void> - 所有事件发布完成的 Promise
   */
  async publishMultiple<T extends BaseEvent>(events: T[]): Promise<void> {
    for (const event of events) {
      this.event$.next(event);
    }
  }

  /**
   * 订阅指定类型的事件
   *
   * @description
   * 返回一个 Observable，用于订阅指定类型的事件。
   * 当模块销毁时，订阅会自动取消。
   *
   * @param eventType - 要订阅的事件类型构造函数
   * @returns Observable<T> - 指定类型事件的 Observable
   *
   * @example
   * ```typescript
   * // 订阅任务创建事件
   * this.eventBus.ofType(TaskCreatedEvent).subscribe(event => {
   *   console.log('Task created:', event);
   * });
   * ```
   */
  ofType<T extends BaseEvent>(eventType: EventType<T>): Observable<T> {
    return this.event$.asObservable().pipe(
      takeUntil(this.onDestroy$), // 模块销毁时取消订阅
      filter((item) => item.constructor === eventType), // 过滤指定类型的事件
    ) as Observable<T>;
  }

  /**
   * 模块销毁时的生命周期钩子
   *
   * @description
   * 完成销毁信号，确保所有订阅者正确取消订阅。
   */
  onModuleDestroy(): void {
    /**
     * 发送完成信号到 onDestroy$ subject
     * 这通常用于通知清理或完成异步任务
     */
    this.onDestroy$.next();

    /**
     * 完成 onDestroy$ subject，标记为已完成
     * 完成后，subject 将不再发出任何值
     */
    this.onDestroy$.complete();
  }
}
