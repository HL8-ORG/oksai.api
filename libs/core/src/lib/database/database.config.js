"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMikroOrmConfig = createMikroOrmConfig;
const postgresql_1 = require("@mikro-orm/postgresql");
const core_1 = require("@mikro-orm/core");
function createMikroOrmConfig(configService, entities = []) {
    const dbConfig = configService.getDatabaseConfig();
    if (!dbConfig) {
        throw new Error('数据库配置未找到');
    }
    const mikroOrmPostgreSqlOptions = {
        driver: postgresql_1.PostgreSqlDriver,
        host: dbConfig.host,
        port: dbConfig.port,
        dbName: dbConfig.name,
        user: dbConfig.user,
        password: dbConfig.password,
        migrations: {
            path: 'dist/libs/core/src/lib/database/migrations',
            pathTs: 'libs/core/src/lib/database/migrations',
            glob: '!(*.d).{js,ts}',
        },
        entities: entities,
        driverOptions: {
            connection: {
                ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
            },
        },
        pool: {
            min: 0,
            max: parseInt(process.env.DB_POOL_SIZE || '10', 10),
        },
        persistOnCreate: true,
        namingStrategy: core_1.EntityCaseNamingStrategy,
        debug: process.env.DB_LOGGING === 'true' || process.env.NODE_ENV === 'development',
    };
    return mikroOrmPostgreSqlOptions;
}
//# sourceMappingURL=database.config.js.map