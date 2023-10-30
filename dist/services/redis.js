"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const tslib_1 = require("tslib");
const ioredis_1 = tslib_1.__importDefault(require("ioredis"));
const logger_1 = require("../utilis/logger");
const client = ioredis_1.default.createClient();
client.on('error', (err) => console.log(err));
client.on('connect', () => (0, logger_1.log)(logger_1.Log.bg.green, "Redis connected"));
exports.RedisService = {
    async setJson(key, value) {
        const jsonValue = JSON.stringify(value);
        await client.set(key, jsonValue, 'EX', 3600); // Set a 1-hour expiration time (adjust as needed)
        return true;
    },
    async getJson(key) {
        const result = await client.get(key);
        return result ? JSON.parse(result) : null;
    },
    async deleteJson(key) {
        // Delete the specified key from Redis
        const result = await client.del(key);
        return result;
    },
};
//# sourceMappingURL=redis.js.map