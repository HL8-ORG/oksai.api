"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphqlCoreModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const config_1 = require("@oksai/config");
const graphql_config_1 = require("./graphql.config");
let GraphqlCoreModule = class GraphqlCoreModule {
    static registerAsync(optionsFactory) {
        return graphql_1.GraphQLModule.forRootAsync({
            driver: apollo_1.ApolloDriver,
            useFactory: async (configService) => {
                const options = optionsFactory(configService);
                return (0, graphql_config_1.createGraphqlModuleOptions)(configService, options);
            },
            inject: [config_1.ConfigService],
            imports: [],
        });
    }
};
exports.GraphqlCoreModule = GraphqlCoreModule;
exports.GraphqlCoreModule = GraphqlCoreModule = __decorate([
    (0, common_1.Module)({})
], GraphqlCoreModule);
//# sourceMappingURL=graphql.module.js.map