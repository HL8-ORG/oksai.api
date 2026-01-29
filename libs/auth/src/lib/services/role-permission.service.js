"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissionService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@mikro-orm/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const role_permission_entity_1 = require("../entities/role-permission.entity");
let RolePermissionService = class RolePermissionService {
    rolePermissionRepository;
    constructor(rolePermissionRepository) {
        this.rolePermissionRepository = rolePermissionRepository;
    }
    async checkRolePermission(tenantId, roleId, permissions, requireAll = false) {
        if (!permissions || permissions.length === 0) {
            return true;
        }
        const rolePermissions = await this.rolePermissionRepository.find({
            roleId,
            tenantId,
            enabled: true,
            permission: { $in: permissions },
        });
        const hasPermissions = rolePermissions.map((rp) => rp.permission);
        if (requireAll) {
            return permissions.every((p) => hasPermissions.includes(p));
        }
        else {
            return permissions.some((p) => hasPermissions.includes(p));
        }
    }
    async getRolePermissions(tenantId, roleId) {
        const rolePermissions = await this.rolePermissionRepository.find({
            roleId,
            tenantId,
            enabled: true,
        });
        return rolePermissions.map((rp) => rp.permission);
    }
};
exports.RolePermissionService = RolePermissionService;
exports.RolePermissionService = RolePermissionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectRepository)(role_permission_entity_1.RolePermission)),
    __metadata("design:paramtypes", [core_1.EntityRepository])
], RolePermissionService);
//# sourceMappingURL=role-permission.service.js.map