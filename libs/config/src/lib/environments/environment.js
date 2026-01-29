"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config({ quiet: true });
const isProduction = process.env.NODE_ENV === 'production';
exports.environment = {
    port: process.env.API_PORT || 3000,
    host: process.env.API_HOST || '0.0.0.0',
    baseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
    clientBaseUrl: process.env.CLIENT_BASE_URL || 'http://localhost:4200',
    production: isProduction,
    envName: isProduction ? 'prod' : 'dev',
    env: {
        LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
    },
    EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET || 'oksai-session-secret',
    USER_PASSWORD_BCRYPT_SALT_ROUNDS: parseInt(process.env.USER_PASSWORD_BCRYPT_SALT_ROUNDS || '12', 10),
    JWT_SECRET: process.env.JWT_SECRET || 'secretKey',
    JWT_TOKEN_EXPIRATION_TIME: parseInt(process.env.JWT_TOKEN_EXPIRATION_TIME || '86400', 10) || 86400,
    JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET || 'refreshSecretKey',
    JWT_REFRESH_TOKEN_EXPIRATION_TIME: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME || '604800', 10) || 604800,
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432', 10),
        name: process.env.DB_NAME || 'oksai',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'password',
        orm: process.env.DB_ORM || 'mikro-orm',
    },
    redis: {
        url: process.env.REDIS_URL || 'redis://localhost:6379',
    },
    otel: {
        enabled: process.env.OTEL_ENABLED === 'true',
        provider: process.env.OTEL_PROVIDER || 'jaeger',
        tracesEndpoint: process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT || 'http://localhost:14268/api/traces',
        serviceName: process.env.OTEL_SERVICE_NAME || 'oksai-api',
    },
    sentry: {
        dsn: process.env.SENTRY_DSN,
    },
    posthog: {
        key: process.env.POSTHOG_KEY,
        host: process.env.POSTHOG_HOST || 'https://app.posthog.com',
        enabled: process.env.POSTHOG_ENABLED === 'true',
    },
};
//# sourceMappingURL=environment.js.map