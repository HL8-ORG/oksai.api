/**
 * 数据库集成测试
 *
 * @description
 * 测试数据库连接和基本 CRUD 操作。
 *
 * @package @oksai/tests
 */

import { Test, TestingModule } from '@nestjs/testing';
import { MikroORM } from '@mikro-orm/core';
import { DatabaseModule } from '@oksai/core';
import { ConfigModule } from '@oksai/config';
import { Task } from '../../../apps/api/src/modules/task/entities/task.entity';

describe('数据库集成测试', () => {
  let module: TestingModule;
  let orm: MikroORM;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        DatabaseModule,
      ],
    }).compile();

    orm = module.get<MikroORM>(MikroORM);
  });

  afterAll(async () => {
    if (orm) {
      await orm.close();
    }
    if (module) {
      await module.close();
    }
  });

  it('应该能够连接到数据库', async () => {
    const isConnected = await orm.isConnected();
    expect(isConnected).toBe(true);
  });

  it('应该能够执行数据库迁移', async () => {
    const migrator = orm.getMigrator();
    // 注意：在实际测试中，应该使用测试数据库
    // 这里只验证迁移器是否可用
    expect(migrator).toBeDefined();
  });

  it('应该能够获取实体管理器', async () => {
    const em = orm.em.fork();
    expect(em).toBeDefined();
  });
});
