"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEntitiesFromPlugins = getEntitiesFromPlugins;
exports.getSubscribersFromPlugins = getSubscribersFromPlugins;
exports.getPluginConfigurations = getPluginConfigurations;
function getEntitiesFromPlugins(config) {
    const entities = [];
    if (!config.plugins) {
        return entities;
    }
    for (const plugin of config.plugins) {
        if (typeof plugin === 'function') {
            const pluginInstance = new plugin();
            if (pluginInstance && typeof pluginInstance.getEntities === 'function') {
                const pluginEntities = pluginInstance.getEntities();
                if (Array.isArray(pluginEntities)) {
                    entities.push(...pluginEntities);
                }
            }
        }
    }
    return entities;
}
function getSubscribersFromPlugins(config) {
    const subscribers = [];
    if (!config.plugins) {
        return subscribers;
    }
    for (const plugin of config.plugins) {
        if (typeof plugin === 'function') {
            const pluginInstance = new plugin();
            if (pluginInstance &&
                typeof pluginInstance.getSubscribers === 'function') {
                const pluginSubscribers = pluginInstance.getSubscribers();
                if (Array.isArray(pluginSubscribers)) {
                    subscribers.push(...pluginSubscribers);
                }
            }
        }
    }
    return subscribers;
}
function getPluginConfigurations(plugins) {
    const configurations = [];
    if (!plugins) {
        return configurations;
    }
    for (const plugin of plugins) {
        if (typeof plugin === 'function') {
            const pluginInstance = new plugin();
            if (pluginInstance &&
                typeof pluginInstance.configure === 'function') {
                configurations.push(pluginInstance.configure.bind(pluginInstance));
            }
        }
    }
    return configurations;
}
//# sourceMappingURL=plugin-registry.js.map