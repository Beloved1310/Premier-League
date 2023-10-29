"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixtureController = void 0;
const fixture_1 = require("../validation/fixture");
const fixture_2 = require("../services/fixture");
const redis_1 = require("../services/redis");
const response_1 = require("../services/response");
exports.fixtureController = {
    async createFixture(req, res) {
        console.log(req.body);
        const { value, error } = fixture_1.fixtureValidation.create.validate(req.body);
        if (error)
            return res.status(400).send({ error: error.details[0].message });
        const data = await fixture_2.fixtureService.createFixture(value);
        // Cache the fixture data
        // await RedisService.deleteJson(`pending-fixtures`)
        await redis_1.RedisService.setJson(`fixture:${data.code}`, data);
        return response_1.ResponseService.success(res, 'Fixture Successfully Created', data);
    },
    async updateFixture(req, res) {
        const { value, error } = fixture_1.fixtureValidation.update.validate(req.body);
        if (error)
            return res.status(400).send({ error: error.details[0].message });
        const { code } = req.params;
        await fixture_2.fixtureService.updateFixture(code, value);
        await redis_1.RedisService.deleteJson(`fixture:${code}`);
        await redis_1.RedisService.deleteJson(`completed-fixtures`);
        return response_1.ResponseService.success(res, 'Fixture Successfully Updated');
    },
    async deleteFixture(req, res) {
        const { code } = req.params;
        // Delete the fixture and its cache
        await redis_1.RedisService.deleteJson(`fixture:${code}`);
        await fixture_2.fixtureService.deleteFixture(code);
        return response_1.ResponseService.success(res, 'Fixture Successfully Deleted');
    },
    async viewFixture(req, res) {
        const { code } = req.params;
        const cachedFixture = await redis_1.RedisService.getJson(`fixture:${code}`);
        // const cachedFixture = ''
        if (cachedFixture) {
            return response_1.ResponseService.success(res, 'Fixture Successfully Retrieved', cachedFixture);
        }
        else {
            const fixture = await fixture_2.fixtureService.getFixture(code);
            // Cache the fixture data
            await redis_1.RedisService.setJson(`fixture:${code}`, fixture);
            return response_1.ResponseService.success(res, 'Fixture Successfully Retrieved', fixture);
        }
    },
    async listPendingFixtures(req, res) {
        const queryParams = { ...req.query };
        const cacheKey = JSON.stringify(queryParams);
        const cachedFixtures = await redis_1.RedisService.getJson(`pending-fixtures:${cacheKey}`);
        // const cachedFixtures = await RedisService.deleteJson(`pending-fixtures`)
        if (cachedFixtures) {
            return response_1.ResponseService.success(res, 'Fixtures Successfully Retrieved', cachedFixtures);
        }
        else {
            const data = await fixture_2.fixtureService.listPendingFixtures(queryParams);
            await redis_1.RedisService.setJson(`pending-fixtures:${cacheKey}`, data);
            return response_1.ResponseService.success(res, 'Pending Fixtures Successfully Retrieved', data);
        }
    },
    async listCompletedFixtures(req, res) {
        const queryParams = { ...req.query };
        const cacheKey = JSON.stringify(queryParams);
        const cachedFixtures = await redis_1.RedisService.getJson(`completed-fixtures:${cacheKey}`);
        if (cachedFixtures) {
            return response_1.ResponseService.success(res, 'Fixtures Successfully Retrieved', cachedFixtures);
        }
        else {
            const data = await fixture_2.fixtureService.listCompletedFixtures(queryParams);
            await redis_1.RedisService.setJson(`completed-fixtures:${cacheKey}`, data);
            return response_1.ResponseService.success(res, 'Completed Fixtures Successfully Retrieved', data);
        }
    },
    async listFixtures(req, res) {
        const queryParams = { ...req.query };
        const cacheKey = JSON.stringify(queryParams);
        const cachedFixtures = await redis_1.RedisService.getJson(`fixtures:${cacheKey}`);
        if (cachedFixtures) {
            return response_1.ResponseService.success(res, 'Fixtures Successfully Retrieved', cachedFixtures);
        }
        else {
            const data = await fixture_2.fixtureService.listFixtures(queryParams);
            await redis_1.RedisService.setJson(`fixtures:${cacheKey}`, data);
            return response_1.ResponseService.success(res, 'Fixtures Successfully Retrieved', data);
        }
    },
};
//# sourceMappingURL=fixture.js.map