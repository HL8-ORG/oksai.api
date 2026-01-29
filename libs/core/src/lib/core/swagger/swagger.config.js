"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_1 = require("@nestjs/swagger");
function setupSwagger(app, options = {}) {
    const { title = 'Oksai API', description = 'Oksai API 文档', version = '1.0.0', path = 'api/docs', enabled = process.env.NODE_ENV !== 'production', } = options;
    if (!enabled) {
        return;
    }
    const config = new swagger_1.DocumentBuilder()
        .setTitle(title)
        .setDescription(description)
        .setVersion(version)
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: '输入 JWT Token',
        in: 'header',
    }, 'JWT-auth')
        .addTag('auth', '认证相关接口')
        .addTag('users', '用户管理接口')
        .addTag('tenants', '租户管理接口')
        .addTag('organizations', '组织管理接口')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup(path, app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
}
//# sourceMappingURL=swagger.config.js.map