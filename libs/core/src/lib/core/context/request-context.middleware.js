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
var RequestContextMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestContextMiddleware = void 0;
const common_1 = require("@nestjs/common");
const nestjs_cls_1 = require("nestjs-cls");
const request_context_1 = require("./request-context");
let RequestContextMiddleware = RequestContextMiddleware_1 = class RequestContextMiddleware {
    clsService;
    logger = new common_1.Logger(RequestContextMiddleware_1.name);
    loggingEnabled = true;
    constructor(clsService) {
        this.clsService = clsService;
    }
    use(req, res, next) {
        this.clsService.run(() => {
            const correlationId = req.headers['x-correlation-id'];
            const id = correlationId || crypto.randomUUID();
            const context = new request_context_1.RequestContext({ id, req, res });
            this.clsService.set(request_context_1.RequestContext.name, context);
            const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
            if (this.loggingEnabled) {
                const contextId = request_context_1.RequestContext.getContextId();
                this.logger.log(`Context ${contextId}: ${req.method} request to ${fullUrl} started.`);
            }
            const originalEnd = res.end.bind(res);
            res.end = (...args) => {
                if (this.loggingEnabled) {
                    const contextId = request_context_1.RequestContext.getContextId();
                    this.logger.log(`Context ${contextId}: ${req.method} request to ${fullUrl} completed with status ${res.statusCode}.`);
                }
                return originalEnd(...args);
            };
            next();
        });
    }
};
exports.RequestContextMiddleware = RequestContextMiddleware;
exports.RequestContextMiddleware = RequestContextMiddleware = RequestContextMiddleware_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_cls_1.ClsService])
], RequestContextMiddleware);
//# sourceMappingURL=request-context.middleware.js.map