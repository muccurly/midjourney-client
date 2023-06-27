"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatOptions = exports.nextNonce = exports.random = exports.sleep = void 0;
const snowyflake_1 = require("snowyflake");
const sleep = async (ms) => await new Promise((resolve) => setTimeout(resolve, ms));
exports.sleep = sleep;
const random = (min, max) => Math.floor(Math.random() * (max - min) + min);
exports.random = random;
const snowflake = new snowyflake_1.Snowyflake({
    workerId: 0n,
    processId: 0n,
    epoch: snowyflake_1.Epoch.Discord, // BigInt timestamp
});
const nextNonce = () => snowflake.nextId().toString();
exports.nextNonce = nextNonce;
const formatOptions = (components) => {
    var data = [];
    for (var i = 0; i < components.length; i++) {
        const component = components[i];
        if (component.components && component.components.length > 0) {
            const item = (0, exports.formatOptions)(component.components);
            data = data.concat(item);
        }
        if (!component.custom_id)
            continue;
        data.push({
            type: component.type,
            style: component.style,
            label: component.label || component.emoji?.name,
            custom: component.custom_id,
        });
    }
    return data;
};
exports.formatOptions = formatOptions;
//# sourceMappingURL=index.js.map