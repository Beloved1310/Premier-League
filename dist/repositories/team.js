"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamRepository = void 0;
const tslib_1 = require("tslib");
const team_1 = tslib_1.__importDefault(require("../model/team"));
exports.teamRepository = {
    async getOneTeam(item) {
        const foundTeam = await team_1.default.findOne(item).select('-__v');
        return foundTeam;
    },
    async createTeam(createTeam) {
        const team = await team_1.default.create(createTeam);
        const { _id, __v, ...data } = team.toObject();
        return data;
    },
    async updateTeam(code, updateFields) {
        const team = await team_1.default.updateOne({ code }, {
            $set: {
                ...updateFields,
            },
        });
        return team;
    },
    async deleteTeam(code) {
        const team = await team_1.default.deleteOne({ code });
        return team;
    },
    async listTeams(queryParams) {
        const perPage = 10;
        const page = parseInt(queryParams.page) || 1;
        const skip = (page - 1) * perPage;
        const [team, total] = await Promise.all([
            team_1.default.find(queryParams)
                .skip(skip)
                .limit(perPage)
                .select('-_id -__v')
                .exec(),
            team_1.default.countDocuments(queryParams).exec(),
        ]);
        const meta = {
            total,
            page,
            perPage,
            hasMore: total > page * perPage,
            nextPage: total > page * perPage ? page + 1 : null,
        };
        return { team, meta };
    },
};
//# sourceMappingURL=team.js.map