/**
 * CrudService 单元测试
 *
 * @description
 * 测试 CRUD 服务基类的功能。
 *
 * @package @oksai/core
 */

import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { CrudService } from './crud.service';

/**
 * 测试实体接口
 */
interface TestEntity {
  id?: string;
  name: string;
  value?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * 测试实体类（简化版，不继承 BaseEntity 以避免循环依赖）
 */
class TestEntityImpl implements TestEntity {
  id?: string;
  name!: string;
  value?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * 测试 CRUD 服务实现
 */
class TestCrudService extends CrudService<TestEntityImpl> {
  constructor(repository: EntityRepository<TestEntityImpl>, em: EntityManager) {
    super(repository, em);
  }
}

describe('CrudService', () => {
  let service: TestCrudService;
  let repository: jest.Mocked<EntityRepository<TestEntityImpl>>;
  let em: jest.Mocked<EntityManager>;

  beforeEach(async () => {
    // 创建 mock repository
    repository = {
      count: jest.fn(),
      findAndCount: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
    } as any;

    // 创建 mock entity manager
    em = {
      persist: jest.fn(),
      flush: jest.fn(),
      remove: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TestCrudService,
          useFactory: () => new TestCrudService(repository, em),
        },
      ],
    }).compile();

    service = module.get<TestCrudService>(TestCrudService);
  });

  it('应该被定义', () => {
    expect(service).toBeDefined();
  });

  describe('count', () => {
    it('应该返回实体数量', async () => {
      const filter = { name: 'test' };
      repository.count.mockResolvedValue(5);

      const result = await service.count(filter);

      expect(result).toBe(5);
      expect(repository.count).toHaveBeenCalledWith(filter);
    });

    it('应该在没有过滤条件时使用空对象', async () => {
      repository.count.mockResolvedValue(10);

      const result = await service.count();

      expect(result).toBe(10);
      expect(repository.count).toHaveBeenCalledWith({});
    });
  });

  describe('findAll', () => {
    it('应该返回所有实体', async () => {
      const entities = [
        { id: '1', name: 'test1' } as TestEntityImpl,
        { id: '2', name: 'test2' } as TestEntityImpl,
      ];
      repository.findAndCount.mockResolvedValue([entities, 2]);

      const result = await service.findAll();

      expect(result.items).toEqual(entities);
      expect(result.total).toBe(2);
      expect(repository.findAndCount).toHaveBeenCalled();
    });
  });

  describe('findOneById', () => {
    it('应该根据 ID 查找实体', async () => {
      const entity = { id: '1', name: 'test' } as TestEntity;
      repository.findOne.mockResolvedValue(entity);

      const result = await service.findOneById('1');

      expect(result).toEqual(entity);
      expect(repository.findOne).toHaveBeenCalledWith({ id: '1' }, undefined);
    });

    it('应该在没有找到实体时返回 null', async () => {
      repository.findOne.mockResolvedValue(null);

      const result = await service.findOneById('1');

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('应该创建新实体', async () => {
      const entityData = { name: 'test', value: 123 };
      const newEntity = { id: '1', ...entityData } as TestEntityImpl;
      repository.create.mockReturnValue(newEntity);
      em.flush.mockResolvedValue(undefined);

      const result = await service.create(entityData);

      expect(result).toEqual(newEntity);
      expect(repository.create).toHaveBeenCalledWith(entityData);
      expect(em.persist).toHaveBeenCalledWith(newEntity);
      expect(em.flush).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    // 注意：update 方法的完整测试（包括 wrap 函数）在集成测试中验证
    // 这里只测试错误情况，因为 wrap 函数需要真实的 MikroORM 实体对象

    it('应该在实体不存在时抛出 NotFoundException', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.update('1', { name: 'new' })).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.update('1', { name: 'new' })).rejects.toThrow(
        'Entity with ID 1 not found',
      );
    });
  });

  describe('delete', () => {
    it('应该删除实体', async () => {
      const entity = { id: '1', name: 'test' } as TestEntity;
      repository.findOne.mockResolvedValue(entity);
      em.flush.mockResolvedValue(undefined);

      await service.delete('1');

      expect(repository.findOne).toHaveBeenCalledWith({ id: '1' }, undefined);
      expect(em.remove).toHaveBeenCalledWith(entity);
      expect(em.flush).toHaveBeenCalled();
    });

    it('应该在实体不存在时抛出 NotFoundException', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.delete('1')).rejects.toThrow(NotFoundException);
      await expect(service.delete('1')).rejects.toThrow(
        'Entity with ID 1 not found',
      );
    });
  });
});
