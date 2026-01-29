"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseQuery = void 0;
class BaseQuery {
    id;
    createdAt;
    constructor() {
        this.id = crypto.randomUUID();
        this.createdAt = new Date();
    }
}
exports.BaseQuery = BaseQuery;
//# sourceMappingURL=base-query.js.map