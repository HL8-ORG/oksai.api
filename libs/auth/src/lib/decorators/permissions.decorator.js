"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permissions = exports.PERMISSIONS_METADATA = void 0;
const common_1 = require("@nestjs/common");
exports.PERMISSIONS_METADATA = 'permissions';
const Permissions = (...permissions) => (0, common_1.SetMetadata)(exports.PERMISSIONS_METADATA, permissions);
exports.Permissions = Permissions;
//# sourceMappingURL=permissions.decorator.js.map