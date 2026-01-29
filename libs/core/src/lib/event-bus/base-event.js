"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEvent = void 0;
class BaseEvent {
    id;
    createdAt;
    constructor() {
        this.id = crypto.randomUUID();
        this.createdAt = new Date();
    }
}
exports.BaseEvent = BaseEvent;
//# sourceMappingURL=base-event.js.map