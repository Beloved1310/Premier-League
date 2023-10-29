"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixtureService = void 0;
const tslib_1 = require("tslib");
const fixture_1 = require("../repositories/fixture");
const team_1 = require("../repositories/team");
const not_found_error_1 = tslib_1.__importDefault(require("../utilis/not-found-error"));
exports.fixtureService = {
    async createFixture(payload) {
        const fixture = await team_1.teamRepository.getOneTeam({ name: payload.homeTeam });
        if (!fixture)
            throw new not_found_error_1.default('Home Team Fixture');
        payload.homeTeam = fixture._id;
        const awayfixture = await team_1.teamRepository.getOneTeam({ name: payload.awayTeam });
        if (!awayfixture)
            throw new not_found_error_1.default('Away Team Fixture');
        payload.awayTeam = awayfixture._id;
        const createFixture = await fixture_1.fixtureRepository.createFixture(payload);
        return createFixture;
    },
    async updateFixture(code, updateFields) {
        const fixture = await fixture_1.fixtureRepository.getOneFixture({ code });
        if (!fixture)
            throw new not_found_error_1.default('Fixture');
        const createFixture = await fixture_1.fixtureRepository.updateFixture(code, updateFields);
        return createFixture;
    },
    async deleteFixture(code) {
        const fixture = await fixture_1.fixtureRepository.getOneFixture({ code });
        if (!fixture)
            throw new not_found_error_1.default('Fixture');
        const deleteFixture = await fixture_1.fixtureRepository.deleteFixture(code);
        return deleteFixture;
    },
    async getFixture(code) {
        const fixture = await fixture_1.fixtureRepository.getOneFixture({ code });
        if (!fixture)
            throw new not_found_error_1.default('Fixture');
        return fixture;
    },
    async listPendingFixtures(queryParams) {
        if (typeof queryParams.status === 'string') {
            queryParams.status = { $regex: queryParams.status, $options: 'i' };
        }
        const listFixtures = await fixture_1.fixtureRepository.listPendingFixtures(queryParams);
        return listFixtures;
    },
    async listCompletedFixtures(queryParams) {
        if (typeof queryParams.status === 'string') {
            queryParams.status = { $regex: queryParams.status, $options: 'i' };
        }
        const listFixtures = await fixture_1.fixtureRepository.listCompletedFixtures(queryParams);
        return listFixtures;
    },
    async listFixtures(queryParams) {
        if (typeof queryParams.awayTeam === 'string') {
            const awayTeamFixture = await team_1.teamRepository.getOneTeam({ name: { $regex: new RegExp(queryParams.awayTeam, 'i') } });
            queryParams.awayTeam = awayTeamFixture === null || awayTeamFixture === void 0 ? void 0 : awayTeamFixture._id;
        }
        if (typeof queryParams.homeTeam === 'string') {
            const homeTeamFixture = await team_1.teamRepository.getOneTeam({ name: { $regex: new RegExp(queryParams.homeTeam, 'i') } });
            queryParams.homeTeam = homeTeamFixture === null || homeTeamFixture === void 0 ? void 0 : homeTeamFixture._id;
        }
        if (typeof queryParams.kickoffTime === 'string') {
            queryParams.kickoffTime = { $eq: queryParams.kickoffTime.toLowerCase() };
        }
        if (typeof queryParams.result === 'string') {
            queryParams.result = { $eq: queryParams.result.toLowerCase() };
        }
        const listFixtures = await fixture_1.fixtureRepository.listFixtures(queryParams);
        return listFixtures;
    },
};
//# sourceMappingURL=fixture.js.map