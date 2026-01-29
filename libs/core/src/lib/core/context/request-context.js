"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestContext = void 0;
const nestjs_cls_1 = require("nestjs-cls");
class RequestContext {
    static clsService;
    _id;
    _req;
    _res;
    constructor(options = {}) {
        const contextId = options.id || crypto.randomUUID();
        RequestContext.setContextId(contextId);
        this._id = contextId;
        this._req = options.req;
        this._res = options.res;
    }
    get id() {
        return this._id;
    }
    get req() {
        return this._req;
    }
    get res() {
        return this._res;
    }
    static setClsService(service) {
        RequestContext.clsService = service;
    }
    static setContextId(id) {
        if (RequestContext.clsService) {
            RequestContext.clsService.set(nestjs_cls_1.CLS_ID, id);
        }
    }
    static getContextId() {
        if (RequestContext.clsService) {
            return RequestContext.clsService.get(nestjs_cls_1.CLS_ID);
        }
        return undefined;
    }
    static currentRequestContext() {
        if (RequestContext.clsService) {
            return RequestContext.clsService.get(RequestContext.name);
        }
        return undefined;
    }
    static currentRequest() {
        const context = RequestContext.currentRequestContext();
        return context?.req;
    }
    static currentResponse() {
        const context = RequestContext.currentRequestContext();
        return context?.res;
    }
    static getTenantId() {
        const req = RequestContext.currentRequest();
        return req?.headers['tenant-id'];
    }
    static getOrganizationId() {
        const req = RequestContext.currentRequest();
        return req?.headers['organization-id'];
    }
}
exports.RequestContext = RequestContext;
//# sourceMappingURL=request-context.js.map