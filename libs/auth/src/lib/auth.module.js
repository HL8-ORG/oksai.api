"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const nestjs_1 = require("@mikro-orm/nestjs");
const entities_1 = require("./entities");
const auth_service_1 = require("./services/auth.service");
const role_permission_service_1 = require("./services/role-permission.service");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const permission_guard_1 = require("./guards/permission.guard");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'your-secret-key',
                signOptions: {
                    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
                },
            }),
            nestjs_1.MikroOrmModule.forFeature([entities_1.User, entities_1.Role, entities_1.RolePermission]),
        ],
        providers: [
            auth_service_1.AuthService,
            role_permission_service_1.RolePermissionService,
            jwt_strategy_1.JwtStrategy,
            jwt_auth_guard_1.JwtAuthGuard,
            permission_guard_1.PermissionGuard,
        ],
        exports: [
            auth_service_1.AuthService,
            role_permission_service_1.RolePermissionService,
            jwt_auth_guard_1.JwtAuthGuard,
            permission_guard_1.PermissionGuard,
            jwt_1.JwtModule,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map