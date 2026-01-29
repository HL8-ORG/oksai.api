"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiORMColumn = MultiORMColumn;
const core_1 = require("@mikro-orm/core");
function MultiORMColumn(options) {
    return (target, propertyKey) => {
        (0, core_1.Property)(options)(target, propertyKey);
    };
}
//# sourceMappingURL=multi-orm-column.decorator.js.map