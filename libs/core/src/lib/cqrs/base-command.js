"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCommand = void 0;
class BaseCommand {
    id;
    createdAt;
    constructor() {
        this.id = crypto.randomUUID();
        this.createdAt = new Date();
    }
}
exports.BaseCommand = BaseCommand;
//# sourceMappingURL=base-command.js.map