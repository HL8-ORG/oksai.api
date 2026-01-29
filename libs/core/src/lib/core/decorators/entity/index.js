"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiORMOneToMany = exports.MultiORMManyToOne = void 0;
__exportStar(require("./multi-orm-column.decorator"), exports);
__exportStar(require("./multi-orm-entity.decorator"), exports);
var multi_orm_many_to_one_decorator_1 = require("./multi-orm-many-to-one.decorator");
Object.defineProperty(exports, "MultiORMManyToOne", { enumerable: true, get: function () { return multi_orm_many_to_one_decorator_1.MultiORMManyToOne; } });
var multi_orm_one_to_many_decorator_1 = require("./multi-orm-one-to-many.decorator");
Object.defineProperty(exports, "MultiORMOneToMany", { enumerable: true, get: function () { return multi_orm_one_to_many_decorator_1.MultiORMOneToMany; } });
//# sourceMappingURL=index.js.map