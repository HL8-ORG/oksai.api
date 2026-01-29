/**
 * Task API 集成测试
 *
 * @description
 * 测试 Task 模块的 REST API 端点。
 *
 * @package @oksai/tests
 */

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../apps/api/src/app.module';
import { Task, TaskStatus } from '../../../apps/api/src/modules/task/entities/task.entity';

describe('Task API 集成测试', () => {
  let app: INestApplication;
  let module: TestingModule;
  let authToken: string;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();

    // 注意：在实际测试中，应该先创建用户并获取认证 token
    // 这里简化处理，实际使用时需要实现认证流程
    authToken = 'mock-token';
  });

  afterAll(async () => {
    await app.close();
    await module.close();
  });

  describe('POST /tasks', () => {
    it('应该能够创建任务', async () => {
      const createTaskDto = {
        title: '测试任务',
        description: '这是一个测试任务',
        status: TaskStatus.TODO,
        priority: 3,
      };

      const response = await request(app.getHttpServer())
        .post('/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send(createTaskDto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe(createTaskDto.title);
      expect(response.body.status).toBe(createTaskDto.status);
    });

    it('应该在缺少必填字段时返回 400', async () => {
      const createTaskDto = {
        description: '缺少标题',
      };

      await request(app.getHttpServer())
        .post('/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send(createTaskDto)
        .expect(400);
    });
  });

  describe('GET /tasks', () => {
    it('应该能够获取任务列表', async () => {
      const response = await request(app.getHttpServer())
        .get('/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it('应该支持状态过滤', async () => {
      const response = await request(app.getHttpServer())
        .get('/tasks')
        .query({ status: TaskStatus.TODO })
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /tasks/:id', () => {
    it('应该能够获取单个任务', async () => {
      // 先创建一个任务
      const createResponse = await request(app.getHttpServer())
        .post('/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: '测试任务',
          status: TaskStatus.TODO,
        })
        .expect(201);

      const taskId = createResponse.body.id;

      // 获取任务
      const response = await request(app.getHttpServer())
        .get(`/tasks/${taskId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.id).toBe(taskId);
      expect(response.body.title).toBe('测试任务');
    });

    it('应该在任务不存在时返回 404', async () => {
      await request(app.getHttpServer())
        .get('/tasks/non-existent-id')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });
  });

  describe('PUT /tasks/:id', () => {
    it('应该能够更新任务', async () => {
      // 先创建一个任务
      const createResponse = await request(app.getHttpServer())
        .post('/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: '原始标题',
          status: TaskStatus.TODO,
        })
        .expect(201);

      const taskId = createResponse.body.id;

      // 更新任务
      const updateDto = {
        title: '更新后的标题',
        status: TaskStatus.IN_PROGRESS,
      };

      const response = await request(app.getHttpServer())
        .put(`/tasks/${taskId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateDto)
        .expect(200);

      expect(response.body.title).toBe(updateDto.title);
      expect(response.body.status).toBe(updateDto.status);
    });
  });

  describe('DELETE /tasks/:id', () => {
    it('应该能够删除任务', async () => {
      // 先创建一个任务
      const createResponse = await request(app.getHttpServer())
        .post('/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: '待删除的任务',
          status: TaskStatus.TODO,
        })
        .expect(201);

      const taskId = createResponse.body.id;

      // 删除任务
      await request(app.getHttpServer())
        .delete(`/tasks/${taskId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(204);

      // 验证任务已被删除
      await request(app.getHttpServer())
        .get(`/tasks/${taskId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });
  });
});
