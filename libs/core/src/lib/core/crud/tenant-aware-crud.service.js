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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantAwareCrudService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@mikro-orm/core");
const context_1 = require("../context");
const crud_service_1 = require("./crud.service");
let TenantAwareCrudService = class TenantAwareCrudService extends crud_service_1.CrudService {
    constructor(repository, em) {
        super(repository, em);
    }
    addTenantFilter(filter) {
        const tenantId = context_1.RequestContext.getTenantId();
        if (tenantId) {
            const baseFilter = filter || {};
            return {
                ...baseFilter,
                tenantId,
            };
        }
        return filter || {};
    }
    async count(filter) {
        return await super.count(this.addTenantFilter(filter));
    }
    async findAll(options) {
        const filter = this.addTenantFilter();
        return await super.findAll({ ...options, where: filter });
    }
    async findOneById(id, options) {
        const filter = this.addTenantFilter({ id });
        return await this.repository.findOne(filter, options);
    }
};
exports.TenantAwareCrudService = TenantAwareCrudService;
exports.TenantAwareCrudService = TenantAwareCrudService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.EntityRepository, core_1.EntityManager])
], TenantAwareCrudService);
//# sourceMappingURL=tenant-aware-crud.service.js.map