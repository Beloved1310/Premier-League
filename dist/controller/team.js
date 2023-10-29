"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamController = void 0;
const team_1 = require("../validation/team");
const team_2 = require("../services/team");
const redis_1 = require("../services/redis");
const response_1 = require("../services/response");
exports.teamController = {
    async createTeam(req, res) {
        const { value, error } = team_1.teamValidation.create.validate(req.body);
        if (error)
            return res.status(400).send({ error: error.details[0].message });
        const data = await team_2.teamService.createTeam(value);
        await redis_1.RedisService.deleteJson(`team:${data.code}`);
        return response_1.ResponseService.success(res, 'Team Successfully Created', data);
    },
    async updateTeam(req, res) {
        const { value, error } = team_1.teamValidation.update.validate(req.body);
        if (error)
            return res.status(400).send({ error: error.details[0].message });
        const { code } = req.params;
        await team_2.teamService.updateTeam(code, value);
        await redis_1.RedisService.deleteJson(`team:${code}`);
        return response_1.ResponseService.success(res, 'Team Successfully Updated');
    },
    async deleteTeam(req, res) {
        const { code } = req.params;
        await redis_1.RedisService.deleteJson(`team:${code}`);
        await team_2.teamService.deleteTeam(code);
        return response_1.ResponseService.success(res, 'Team Successfully Deleted');
    },
    async viewTeam(req, res) {
        const { code } = req.params;
        const cachedTeam = await redis_1.RedisService.getJson(`team:${code}`);
        if (cachedTeam) {
            return response_1.ResponseService.success(res, 'Team Successfully Retrieved', cachedTeam);
        }
        else {
            const team = await team_2.teamService.getTeam(code);
            const { _id, ...data } = team.toObject();
            // Cache the team data
            await redis_1.RedisService.setJson(`team:${code}`, data);
            return response_1.ResponseService.success(res, 'Team Successfully Retrieved', data);
        }
    },
    async listTeams(req, res) {
        const queryParams = {
            ...req.query,
        };
        const cacheKey = JSON.stringify(queryParams);
        const cachedTeams = await redis_1.RedisService.getJson(`teams:${cacheKey}`);
        if (cachedTeams) {
            return response_1.ResponseService.success(res, 'Teams Successfully Retrieved', cachedTeams);
        }
        else {
            const data = await team_2.teamService.listTeams(queryParams);
            // Cache the list of teams
            await redis_1.RedisService.setJson(`teams:${cacheKey}`, data);
            // await RedisService.deleteJson(`teams:${cacheKey}`)
            return response_1.ResponseService.success(res, 'Teams Successfully Retrieved', data);
        }
    },
};
//# sourceMappingURL=team.js.map