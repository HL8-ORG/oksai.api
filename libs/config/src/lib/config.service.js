"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const common_1 = require("@nestjs/common");
const environment_1 = require("./environments/environment");
let ConfigService = class ConfigService {
    config = environment_1.environment;
    getEnvironment() {
        return this.config;
    }
    getPort() {
        return typeof this.config.port === 'string' ? parseInt(this.config.port, 10) : this.config.port;
    }
    getHost() {
        return this.config.host;
    }
    getBaseUrl() {
        return this.config.baseUrl;
    }
    isProduction() {
        return this.config.production;
    }
    getDatabaseConfig() {
        return this.config.database;
    }
    getJwtConfig() {
        return {
            secret: this.config.JWT_SECRET,
            refreshSecret: this.config.JWT_REFRESH_TOKEN_SECRET,
            tokenExpirationTime: this.config.JWT_TOKEN_EXPIRATION_TIME,
            refreshTokenExpirationTime: this.config.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
        };
    }
    getRedisConfig() {
        return this.config.redis;
    }
    getOtelConfig() {
        return this.config.otel;
    }
    getSentryConfig() {
        return this.config.sentry;
    }
    getPosthogConfig() {
        return this.config.posthog;
    }
};
exports.ConfigService = ConfigService;
exports.ConfigService = ConfigService = __decorate([
    (0, common_1.Injectable)()
], ConfigService);
//# sourceMappingURL=config.service.js.map