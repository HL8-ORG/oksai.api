"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGraphqlModuleOptions = createGraphqlModuleOptions;
function createGraphqlModuleOptions(_configService, options = {}) {
    const { path = '/graphql', playground = process.env.NODE_ENV !== 'production', debug = process.env.NODE_ENV !== 'production', } = options;
    return {
        path,
        playground,
        debug,
        autoSchemaFile: true,
        sortSchema: true,
        context: ({ req }) => ({ req }),
        formatError: (error) => {
            return {
                message: error.message,
                code: error.extensions?.code,
                path: error.path,
            };
        },
    };
}
//# sourceMappingURL=graphql.config.js.map