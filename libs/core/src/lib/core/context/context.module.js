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
exports.ContextModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_cls_1 = require("nestjs-cls");
const request_context_1 = require("./request-context");
const request_context_middleware_1 = require("./request-context.middleware");
let ContextModule = class ContextModule {
    clsService;
    constructor(clsService) {
        this.clsService = clsService;
        request_context_1.RequestContext.setClsService(this.clsService);
    }
};
exports.ContextModule = ContextModule;
exports.ContextModule = ContextModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            nestjs_cls_1.ClsModule.forRoot({
                global: true,
                middleware: {
                    mount: false,
                },
            }),
        ],
        providers: [request_context_middleware_1.RequestContextMiddleware],
        exports: [nestjs_cls_1.ClsModule, request_context_middleware_1.RequestContextMiddleware],
    }),
    __metadata("design:paramtypes", [Object])
], ContextModule);
//# sourceMappingURL=context.module.js.map