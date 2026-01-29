"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiORMManyToOne = MultiORMManyToOne;
const core_1 = require("@mikro-orm/core");
function MultiORMManyToOne(typeFunctionOrTarget, inverseSideOrOptions, options) {
    let typeFunction;
    let mikroOrmOptions;
    if (typeof inverseSideOrOptions === 'function') {
        typeFunction = typeFunctionOrTarget;
        const inverseSide = inverseSideOrOptions;
        mikroOrmOptions = {
            ...(options || {}),
            mappedBy: inverseSide,
        };
    }
    else {
        typeFunction = typeFunctionOrTarget;
        mikroOrmOptions = (inverseSideOrOptions || options || {});
    }
    return (target, propertyKey) => {
        (0, core_1.ManyToOne)(typeFunction, mikroOrmOptions)(target, propertyKey);
    };
}
//# sourceMappingURL=multi-orm-many-to-one.decorator.js.map