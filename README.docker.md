# Docker 部署指南

## 概述

本项目提供了完整的 Docker 容器化部署方案，包括开发环境和生产环境的配置。

## 文件说明

- `Dockerfile` - 多阶段构建的 Docker 镜像定义
- `docker-compose.yml` - 开发环境 Docker Compose 配置
- `docker-compose.prod.yml` - 生产环境 Docker Compose 配置
- `.dockerignore` - Docker 构建时忽略的文件

## 快速开始

### 开发环境

1. **准备环境变量文件（可选）**

   Docker Compose 已经配置了默认值，可以直接使用。如果需要自定义配置，可以：

   - 创建 `.env.development` 文件（推荐）：
     ```bash
     cp .env.example .env.development
     # 编辑 .env.development 配置环境变量
     ```

   - 或者创建 `.env` 文件：
     ```bash
     cp .env.example .env
     # 编辑 .env 配置环境变量
     ```

   **注意**: 如果不创建环境变量文件，Docker Compose 会使用配置中的默认值。

2. **启动服务**

   ```bash
   docker-compose up -d
   ```

   这将启动以下服务：
   - PostgreSQL 数据库（端口 5432）
   - Redis 缓存（端口 6379）
   - Oksai API 服务（端口 3000）

3. **查看日志**

   ```bash
   docker-compose logs -f api
   ```

4. **停止服务**

   ```bash
   docker-compose down
   ```

### 生产环境

1. **准备环境变量文件**

   创建 `.env.production` 文件并配置生产环境变量：

   ```bash
   cp .env.example .env.production
   # 编辑 .env.production 并配置生产环境变量
   ```

2. **启动服务**

   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

3. **查看日志**

   ```bash
   docker-compose -f docker-compose.prod.yml logs -f api
   ```

4. **停止服务**

   ```bash
   docker-compose -f docker-compose.prod.yml down
   ```

## 构建镜像

### 构建开发镜像

```bash
docker build -t oksai-api:latest .
```

### 构建生产镜像

```bash
docker build -t oksai-api:prod --target runner .
```

## 数据持久化

Docker Compose 配置使用了命名卷来持久化数据：

- `postgres_data` - PostgreSQL 数据
- `redis_data` - Redis 数据

这些卷在容器删除后仍然保留，确保数据安全。

## 健康检查

API 服务提供了健康检查端点：

```bash
curl http://localhost:3000/health
```

Docker 会自动使用此端点进行健康检查。

## 环境变量

主要环境变量说明：

### 应用配置
- `NODE_ENV` - 运行环境（development/production）
- `API_HOST` - API 服务监听地址
- `API_PORT` - API 服务端口
- `API_BASE_URL` - API 基础 URL

### 数据库配置
- `DB_TYPE` - 数据库类型（postgresql）
- `DB_HOST` - 数据库主机
- `DB_PORT` - 数据库端口
- `DB_NAME` - 数据库名称
- `DB_USER` - 数据库用户名
- `DB_PASSWORD` - 数据库密码

### Redis 配置
- `REDIS_HOST` - Redis 主机
- `REDIS_PORT` - Redis 端口
- `REDIS_PASSWORD` - Redis 密码

### JWT 配置
- `JWT_SECRET` - JWT 密钥（生产环境必须更改）
- `JWT_EXPIRES_IN` - JWT 过期时间
- `JWT_REFRESH_TOKEN_SECRET` - 刷新 Token 密钥
- `JWT_REFRESH_TOKEN_EXPIRES_IN` - 刷新 Token 过期时间

## 故障排查

### 查看容器状态

```bash
docker-compose ps
```

### 查看容器日志

```bash
docker-compose logs api
docker-compose logs db
docker-compose logs redis
```

### 进入容器调试

```bash
docker-compose exec api sh
```

### 重启服务

```bash
docker-compose restart api
```

## 安全建议

1. **生产环境必须更改默认密钥**
   - `JWT_SECRET`
   - `JWT_REFRESH_TOKEN_SECRET`
   - `EXPRESS_SESSION_SECRET`
   - `DB_PASSWORD`
   - `REDIS_PASSWORD`

2. **使用环境变量文件**
   - 不要将 `.env.production` 提交到版本控制
   - 使用密钥管理服务（如 AWS Secrets Manager）

3. **网络安全**
   - 生产环境不暴露数据库和 Redis 端口
   - 使用反向代理（如 Nginx）处理 HTTPS

4. **资源限制**
   - 生产环境配置资源限制（CPU、内存）
   - 监控容器资源使用情况

## 参考

- [Docker 文档](https://docs.docker.com/)
- [Docker Compose 文档](https://docs.docker.com/compose/)
- [NestJS 部署文档](https://docs.nestjs.com/recipes/deployment)
