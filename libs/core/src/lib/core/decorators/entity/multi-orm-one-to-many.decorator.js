"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiORMOneToMany = MultiORMOneToMany;
const core_1 = require("@mikro-orm/core");
function MultiORMOneToMany(typeFunctionOrTarget, inverseSideOrOptions, options) {
    let typeFunction;
    let mikroOrmOptions;
    if (typeof inverseSideOrOptions === 'function') {
        typeFunction = typeFunctionOrTarget;
        const inverseSide = inverseSideOrOptions;
        const opts = options || {};
        if (opts.cascade === true) {
            opts.cascade = ['persist', 'remove'];
        }
        else if (opts.cascade === false) {
            opts.cascade = [];
        }
        mikroOrmOptions = {
            ...opts,
            mappedBy: inverseSide,
        };
    }
    else {
        typeFunction = typeFunctionOrTarget;
        const opts = (inverseSideOrOptions || options || {});
        if (opts.cascade === true) {
            opts.cascade = ['persist', 'remove'];
        }
        else if (opts.cascade === false) {
            opts.cascade = [];
        }
        mikroOrmOptions = opts;
    }
    return (target, propertyKey) => {
        core_1.OneToMany(typeFunction, mikroOrmOptions)(target, propertyKey);
    };
}
//# sourceMappingURL=multi-orm-one-to-many.decorator.js.map