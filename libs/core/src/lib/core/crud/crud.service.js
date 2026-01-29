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
exports.CrudService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@mikro-orm/core");
let CrudService = class CrudService {
    repository;
    em;
    constructor(repository, em) {
        this.repository = repository;
        this.em = em;
    }
    async count(filter) {
        return await this.repository.count(filter || {});
    }
    async findAll(options) {
        const [items, total] = await this.repository.findAndCount({}, options);
        return {
            items,
            total,
        };
    }
    async findOneById(id, options) {
        return await this.repository.findOne({ id }, options);
    }
    async create(entity) {
        const newEntity = this.repository.create(entity);
        this.em.persist(newEntity);
        await this.em.flush();
        return newEntity;
    }
    async update(id, entity) {
        const existingEntity = await this.findOneById(id);
        if (!existingEntity) {
            throw new common_1.NotFoundException(`Entity with ID ${id} not found`);
        }
        (0, core_1.wrap)(existingEntity).assign(entity);
        await this.em.flush();
        return existingEntity;
    }
    async delete(id) {
        const entity = await this.findOneById(id);
        if (!entity) {
            throw new common_1.NotFoundException(`Entity with ID ${id} not found`);
        }
        this.em.remove(entity);
        await this.em.flush();
    }
};
exports.CrudService = CrudService;
exports.CrudService = CrudService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.EntityRepository,
        core_1.EntityManager])
], CrudService);
//# sourceMappingURL=crud.service.js.map