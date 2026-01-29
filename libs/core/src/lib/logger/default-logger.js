"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultLogger = void 0;
const DEFAULT_CONTEXT = 'Bootstrap Server';
class DefaultLogger {
    logger = console.log;
    _defaultContext = DEFAULT_CONTEXT;
    get defaultContext() {
        return this._defaultContext;
    }
    set defaultContext(context) {
        this._defaultContext = context;
    }
    constructor(_options) { }
    log(message, context) {
        this.printLog('info', message, context);
    }
    error(message, context, trace) {
        this.printLog('error', message, context);
        if (trace) {
            console.error(trace);
        }
    }
    warn(message, context) {
        this.printLog('warn', message, context);
    }
    info(message, context) {
        this.printLog('info', message, context);
    }
    verbose(message, context) {
        this.printLog('verbose', message, context);
    }
    debug(message, context) {
        this.printLog('debug', message, context);
    }
    printLog(level, message, context) {
        const timestamp = new Date().toISOString();
        const ctx = this.printContext(context);
        const levelUpper = level.toUpperCase().padEnd(7);
        const logMessage = `[${timestamp}] ${levelUpper} ${ctx} ${message}`;
        switch (level) {
            case 'error':
                console.error(logMessage);
                break;
            case 'warn':
                console.warn(logMessage);
                break;
            case 'debug':
                console.debug(logMessage);
                break;
            default:
                this.logger(logMessage);
        }
    }
    printContext(context) {
        return `[${context || this.defaultContext}]`;
    }
}
exports.DefaultLogger = DefaultLogger;
//# sourceMappingURL=default-logger.js.map