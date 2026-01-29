"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiORMEnum = void 0;
exports.getORMType = getORMType;
var MultiORMEnum;
(function (MultiORMEnum) {
    MultiORMEnum["TypeORM"] = "typeorm";
    MultiORMEnum["MikroORM"] = "mikro-orm";
})(MultiORMEnum || (exports.MultiORMEnum = MultiORMEnum = {}));
function getORMType(defaultValue = MultiORMEnum.MikroORM) {
    if (!process.env.DB_ORM) {
        return defaultValue;
    }
    switch (process.env.DB_ORM) {
        case MultiORMEnum.TypeORM:
            console.warn('TypeORM 支持尚未实现，使用默认 ORM: MikroORM');
            return MultiORMEnum.MikroORM;
        case MultiORMEnum.MikroORM:
            return MultiORMEnum.MikroORM;
        default:
            console.warn(`无效的 ORM 类型: ${process.env.DB_ORM}，使用默认值: MikroORM`);
            return defaultValue;
    }
}
//# sourceMappingURL=multi-orm.enum.js.map