"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBus = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let EventBus = class EventBus {
    event$ = new rxjs_1.Subject();
    onDestroy$ = new rxjs_1.Subject();
    constructor() { }
    async publish(event) {
        this.event$.next(event);
    }
    async publishMultiple(events) {
        for (const event of events) {
            this.event$.next(event);
        }
    }
    ofType(eventType) {
        return this.event$.asObservable().pipe((0, rxjs_1.takeUntil)(this.onDestroy$), (0, rxjs_1.filter)((item) => item.constructor === eventType));
    }
    onModuleDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }
};
exports.EventBus = EventBus;
exports.EventBus = EventBus = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EventBus);
//# sourceMappingURL=event-bus.js.map