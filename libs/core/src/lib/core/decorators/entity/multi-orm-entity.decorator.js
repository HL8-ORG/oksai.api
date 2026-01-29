"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiORMEntity = MultiORMEntity;
const core_1 = require("@mikro-orm/core");
function MultiORMEntity(nameOrOptions, options) {
    let tableName;
    let entityOptions = {};
    if (typeof nameOrOptions === 'string') {
        tableName = nameOrOptions;
        entityOptions = options || {};
    }
    else if (nameOrOptions) {
        entityOptions = nameOrOptions;
        tableName = nameOrOptions.tableName;
    }
    return (target) => {
        const mikroOrmOptions = {
            tableName: tableName || target.name.toLowerCase() + 's',
            ...entityOptions,
        };
        (0, core_1.Entity)(mikroOrmOptions)(target);
    };
}
//# sourceMappingURL=multi-orm-entity.decorator.js.map