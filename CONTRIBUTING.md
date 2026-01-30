# 贡献指南

感谢您对 Oksai API 项目的关注！我们欢迎所有形式的贡献。

## 目录

- [行为准则](#行为准则)
- [如何贡献](#如何贡献)
- [开发流程](#开发流程)
- [代码规范](#代码规范)
- [提交规范](#提交规范)
- [Pull Request 流程](#pull-request-流程)
- [问题报告](#问题报告)

---

## 行为准则

### 我们的承诺

为了营造开放和友好的环境，我们承诺：

- 使用欢迎和包容的语言
- 尊重不同的观点和经验
- 优雅地接受建设性批评
- 专注于对社区最有利的事情
- 对其他社区成员表示同理心

### 我们的标准

**鼓励的行为**:
- 使用欢迎和包容的语言
- 尊重不同的观点和经验
- 优雅地接受建设性批评
- 专注于对社区最有利的事情
- 对其他社区成员表示同理心

**不可接受的行为**:
- 使用性化的语言或图像
- 人身攻击、侮辱性/贬损性评论
- 公开或私下骚扰
- 未经明确许可发布他人的私人信息
- 其他在专业环境中不适当的行为

---

## 如何贡献

### 报告 Bug

如果您发现了 Bug，请：

1. **检查是否已有相关 Issue**
   - 搜索现有的 Issue，避免重复

2. **创建新的 Issue**
   - 使用清晰的标题
   - 描述问题复现步骤
   - 提供环境信息（Node.js 版本、操作系统等）
   - 包含错误日志或截图

3. **Issue 模板**
   ```
   **Bug 描述**
   清晰简洁地描述 Bug

   **复现步骤**
   1. 执行 '...'
   2. 点击 '....'
   3. 看到错误

   **预期行为**
   应该发生什么

   **实际行为**
   实际发生了什么

   **环境信息**
   - Node.js 版本: 
   - 操作系统: 
   - 其他相关信息:
   ```

### 提出功能建议

如果您有功能建议，请：

1. **检查是否已有相关 Issue**
   - 搜索现有的 Feature Request

2. **创建新的 Issue**
   - 使用 `[Feature Request]` 标签
   - 描述功能的使用场景
   - 说明为什么这个功能有用

3. **Feature Request 模板**
   ```
   **功能描述**
   清晰简洁地描述功能

   **使用场景**
   这个功能在什么场景下有用？

   **可能的实现方案**
   如果有，描述可能的实现方案

   **其他信息**
   任何其他相关信息
   ```

### 贡献代码

1. **Fork 项目**
   ```bash
   # Fork 项目到您的 GitHub 账户
   ```

2. **克隆您的 Fork**
   ```bash
   git clone https://github.com/your-username/oksai.api.git
   cd oksai.api
   ```

3. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-bug-fix
   ```

4. **进行开发**
   - 遵循代码规范
   - 编写测试
   - 更新文档

5. **提交更改**
   ```bash
   git add .
   git commit -m "feat: 添加新功能"
   ```

6. **推送分支**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **创建 Pull Request**
   - 在 GitHub 上创建 Pull Request
   - 填写 PR 描述
   - 等待代码审查

---

## 开发流程

### 1. 设置开发环境

```bash
# 安装依赖
pnpm install

# 配置环境变量
cp .env.example .env.development

# 启动开发服务器
pnpm dev
```

### 2. 创建功能分支

```bash
# 从 main 分支创建新分支
git checkout main
git pull origin main
git checkout -b feature/your-feature-name
```

### 3. 开发

- 编写代码
- 编写测试
- 运行测试确保通过
- 更新文档

### 4. 提交代码

```bash
# 添加更改
git add .

# 提交（遵循提交规范）
git commit -m "feat: 添加新功能"

# 推送分支
git push origin feature/your-feature-name
```

### 5. 创建 Pull Request

- 在 GitHub 上创建 Pull Request
- 填写详细的 PR 描述
- 链接相关的 Issue
- 等待代码审查

---

## 代码规范

### 命名规范

- **文件名**: kebab-case（如 `task.controller.ts`）
- **类名**: PascalCase（如 `TaskController`）
- **变量/函数名**: camelCase（如 `createTask`）
- **常量**: UPPER_SNAKE_CASE（如 `MAX_RETRY_COUNT`）

### 注释规范

所有公共 API 必须编写完整的 TSDoc 注释：

```typescript
/**
 * 任务服务
 *
 * @description
 * 提供任务的业务逻辑处理，包括 CRUD 操作和事件发布。
 *
 * @package @oksai/api
 */
@Injectable()
export class TaskService {
  /**
   * 创建任务
   *
   * @description
   * 创建新任务并发布 TaskCreatedEvent 事件。
   *
   * @param createTaskDto - 创建任务数据
   * @returns Promise<Task> - 创建的任务实体
   * @throws Error - 当租户 ID 为空时抛出
   */
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    // 实现...
  }
}
```

### 代码质量

- ✅ 所有代码必须通过 ESLint 检查
- ✅ 所有代码必须通过 TypeScript 编译
- ✅ 新功能必须包含测试
- ✅ 测试覆盖率必须达到要求（核心逻辑 80%，关键路径 90%）

---

## 提交规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

### 提交类型

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式（不影响代码运行）
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

### 提交格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 示例

```bash
# 功能添加
git commit -m "feat(task): 添加任务优先级功能"

# Bug 修复
git commit -m "fix(auth): 修复 JWT Token 验证问题"

# 文档更新
git commit -m "docs: 更新开发指南"

# 代码重构
git commit -m "refactor(core): 重构 CRUD 服务基类"

# 性能优化
git commit -m "perf(database): 优化任务查询性能"
```

---

## Pull Request 流程

### PR 检查清单

在创建 Pull Request 之前，请确保：

- [ ] 代码遵循项目规范
- [ ] 所有测试通过
- [ ] 测试覆盖率满足要求
- [ ] 代码已通过 ESLint 检查
- [ ] 已更新相关文档
- [ ] 提交信息遵循规范
- [ ] PR 描述清晰完整

### PR 描述模板

```markdown
## 变更类型
- [ ] 新功能
- [ ] Bug 修复
- [ ] 文档更新
- [ ] 代码重构
- [ ] 性能优化
- [ ] 其他

## 变更描述
清晰描述本次 PR 的变更内容

## 相关 Issue
链接相关的 Issue（如 #123）

## 测试
描述如何测试这些变更

## 检查清单
- [ ] 代码遵循项目规范
- [ ] 所有测试通过
- [ ] 已更新相关文档
```

### 代码审查

- 所有 PR 都需要至少一个审查者批准
- 审查者会检查代码质量、测试覆盖、文档完整性
- 根据审查意见进行修改后，重新提交

---

## 问题报告

### Bug 报告

如果发现 Bug，请提供：

1. **清晰的描述**
   - Bug 是什么
   - 如何复现

2. **环境信息**
   - Node.js 版本
   - 操作系统
   - 相关依赖版本

3. **错误信息**
   - 完整的错误堆栈
   - 相关日志

4. **可能的解决方案**
   - 如果有，描述可能的解决方案

### 功能建议

如果提出功能建议，请提供：

1. **功能描述**
   - 功能是什么
   - 为什么需要这个功能

2. **使用场景**
   - 在什么场景下使用
   - 如何解决实际问题

3. **可能的实现**
   - 如果有，描述可能的实现方案

---

## 许可证

通过贡献代码，您同意您的贡献将在与项目相同的许可证下发布（MIT License）。

---

## 联系方式

如有问题，请：

- 创建 Issue
- 联系项目维护者

---

**感谢您的贡献！** 🎉

---

**最后更新**: 2024-12-19
