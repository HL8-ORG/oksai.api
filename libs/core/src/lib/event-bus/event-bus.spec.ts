/**
 * EventBus 单元测试
 *
 * @description
 * 测试事件总线的发布和订阅功能。
 *
 * @package @oksai/core
 */

import { Test, TestingModule } from '@nestjs/testing';
import { EventBus } from './event-bus';
import { BaseEvent } from './base-event';

/**
 * 测试事件类
 */
class TestEvent extends BaseEvent {
  constructor(public readonly data: string) {
    super();
  }
}

/**
 * 另一个测试事件类
 */
class AnotherTestEvent extends BaseEvent {
  constructor(public readonly value: number) {
    super();
  }
}

describe('EventBus', () => {
  let eventBus: EventBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventBus],
    }).compile();

    eventBus = module.get<EventBus>(EventBus);
  });

  afterEach(() => {
    // 清理资源
    eventBus.onModuleDestroy();
  });

  it('应该被定义', () => {
    expect(eventBus).toBeDefined();
  });

  describe('publish', () => {
    it('应该能够发布单个事件', async () => {
      const event = new TestEvent('test data');
      await expect(eventBus.publish(event)).resolves.not.toThrow();
    });

    it('应该能够发布多个事件', async () => {
      const events = [
        new TestEvent('data1'),
        new TestEvent('data2'),
        new TestEvent('data3'),
      ];
      await expect(eventBus.publishMultiple(events)).resolves.not.toThrow();
    });
  });

  describe('ofType', () => {
    it('应该能够订阅特定类型的事件', (done) => {
      const event = new TestEvent('test data');
      let receivedEvent: TestEvent | null = null;

      eventBus.ofType(TestEvent).subscribe({
        next: (e) => {
          receivedEvent = e;
          expect(receivedEvent).toBeInstanceOf(TestEvent);
          expect(receivedEvent?.data).toBe('test data');
          done();
        },
        error: (err) => done(err),
      });

      eventBus.publish(event);
    });

    it('应该只接收指定类型的事件', (done) => {
      const testEvent = new TestEvent('test');
      const anotherEvent = new AnotherTestEvent(123);
      let receivedCount = 0;

      eventBus.ofType(TestEvent).subscribe({
        next: (e) => {
          receivedCount++;
          expect(e).toBeInstanceOf(TestEvent);
          expect(e).not.toBeInstanceOf(AnotherTestEvent);
          if (receivedCount === 2) {
            done();
          }
        },
        error: (err) => done(err),
      });

      // 发布多个不同类型的事件
      eventBus.publish(testEvent);
      eventBus.publish(anotherEvent);
      eventBus.publish(new TestEvent('test2'));
    });

    it('应该能够订阅多个事件', (done) => {
      const events: TestEvent[] = [];
      const expectedEvents = [
        new TestEvent('data1'),
        new TestEvent('data2'),
        new TestEvent('data3'),
      ];

      eventBus.ofType(TestEvent).subscribe({
        next: (e) => {
          events.push(e);
          if (events.length === expectedEvents.length) {
            expect(events).toHaveLength(3);
            expect(events[0].data).toBe('data1');
            expect(events[1].data).toBe('data2');
            expect(events[2].data).toBe('data3');
            done();
          }
        },
        error: (err) => done(err),
      });

      expectedEvents.forEach((event) => eventBus.publish(event));
    });
  });

  describe('onModuleDestroy', () => {
    it('应该在模块销毁时清理资源', () => {
      expect(() => eventBus.onModuleDestroy()).not.toThrow();
    });

    it('应该在销毁后停止接收事件', (done) => {
      const event = new TestEvent('test');
      let received = false;

      eventBus.ofType(TestEvent).subscribe({
        next: () => {
          received = true;
        },
        error: (err) => done(err),
      });

      // 发布事件
      eventBus.publish(event);

      // 等待事件处理
      setTimeout(() => {
        expect(received).toBe(true);
        received = false;

        // 销毁模块
        eventBus.onModuleDestroy();

        // 再次发布事件，应该不会收到
        eventBus.publish(new TestEvent('test2'));

        setTimeout(() => {
          expect(received).toBe(false);
          done();
        }, 100);
      }, 100);
    });
  });
});
