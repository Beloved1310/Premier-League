"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamService = void 0;
const tslib_1 = require("tslib");
const team_1 = require("../repositories/team");
const exists_error_1 = tslib_1.__importDefault(require("../utilis/exists-error"));
const not_found_error_1 = tslib_1.__importDefault(require("../utilis/not-found-error"));
exports.teamService = {
    async createTeam(payload) {
        const team = await team_1.teamRepository.getOneTeam({ name: payload.name });
        if (team)
            throw new exists_error_1.default('Team');
        const createTeam = await team_1.teamRepository.createTeam(payload);
        return createTeam;
    },
    async updateTeam(code, updateFields) {
        const team = await team_1.teamRepository.getOneTeam({ code });
        if (!team)
            throw new not_found_error_1.default('Team');
        const createTeam = await team_1.teamRepository.updateTeam(code, updateFields);
        return createTeam;
    },
    async deleteTeam(code) {
        const team = await team_1.teamRepository.getOneTeam({ code });
        if (!team)
            throw new not_found_error_1.default('Team');
        const deleteTeam = await team_1.teamRepository.deleteTeam(code);
        return deleteTeam;
    },
    async getTeam(code) {
        const team = await team_1.teamRepository.getOneTeam({ code });
        if (!team)
            throw new not_found_error_1.default('Team');
        return team;
    },
    async listTeams(queryParams) {
        if (typeof queryParams.name === 'string') {
            queryParams.name = { $regex: queryParams.name, $options: 'i' };
        }
        if (typeof queryParams.founded === 'string') {
            queryParams.founded = parseInt(queryParams.founded);
        }
        if (typeof queryParams.countries === 'string') {
            queryParams.countries = { $regex: queryParams.countries, $options: 'i' };
        }
        // if (
        //   Array.isArray(queryParams.countries) ||
        //   typeof queryParams.countries === 'string'
        // ) {
        //   const countries = Array.isArray(queryParams.countries)
        //     ? queryParams.countries
        //     : [queryParams.countries]
        //   queryParams.country = { $in: countries }
        // }
        const listTeams = await team_1.teamRepository.listTeams(queryParams);
        return listTeams;
    },
};
//# sourceMappingURL=team.js.map