"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixtureRepository = void 0;
const tslib_1 = require("tslib");
const fixture_1 = tslib_1.__importDefault(require("../model/fixture"));
exports.fixtureRepository = {
    async getOneFixture(item) {
        const foundFixture = await fixture_1.default.findOne(item)
            .select('-_id -__v')
            .populate({
            path: 'homeTeam',
            select: '-_id -__v',
        })
            .populate({
            path: 'awayTeam',
            select: '-_id -__v',
        });
        return foundFixture;
    },
    async createFixture(createFixture) {
        const fixture = await fixture_1.default.create(createFixture);
        await fixture
            .populate({
            path: 'homeTeam',
            select: '-_id -__v',
        })
            .populate({
            path: 'awayTeam',
            select: '-_id -__v',
        })
            .execPopulate();
        const { _id, __v, ...data } = fixture.toObject();
        return data;
    },
    async updateFixture(code, updateFields) {
        const updateFixture = await fixture_1.default.updateOne({ code }, {
            $set: {
                ...updateFields,
            },
        });
        return updateFixture;
    },
    async deleteFixture(code) {
        const deleteFixture = await fixture_1.default.deleteOne({ code });
        return deleteFixture;
    },
    async listPendingFixtures(queryParams) {
        const perPage = 10 || parseInt(queryParams.perPage);
        const page = parseInt(queryParams.page) || 1;
        const skip = (page - 1) * perPage;
        const [fixture, total] = await Promise.all([
            fixture_1.default.find({ status: 'pending' })
                .skip(skip)
                .limit(perPage)
                .select('-_id -__v')
                .populate({
                path: 'homeTeam',
                select: '-_id -__v',
            })
                .populate({
                path: 'awayTeam',
                select: '-_id -__v',
            })
                .exec(),
            fixture_1.default.countDocuments({ status: 'pending' }).exec(),
        ]);
        const meta = {
            total,
            page,
            perPage,
            hasMore: total > page * perPage,
            nextPage: total > page * perPage ? page + 1 : null,
        };
        return { fixture, meta };
    },
    async listCompletedFixtures(queryParams) {
        const perPage = 10;
        const page = parseInt(queryParams.page) || 1;
        const skip = (page - 1) * perPage;
        const [fixture, total] = await Promise.all([
            fixture_1.default.find({ status: 'completed' })
                .skip(skip)
                .limit(perPage)
                .select('-_id -__v')
                .populate({
                path: 'homeTeam',
                select: '-_id -__v',
            })
                .populate({
                path: 'awayTeam',
                select: '-_id -__v',
            })
                .exec(),
            fixture_1.default.countDocuments({ status: 'completed' }).exec(),
        ]);
        const meta = {
            total,
            page,
            perPage,
            hasMore: total > page * perPage,
            nextPage: total > page * perPage ? page + 1 : null,
        };
        return { fixture, meta };
    },
    async listFixtures(queryParams) {
        const perPage = parseInt(queryParams.perPage) || 10;
        const page = parseInt(queryParams.page) || 1;
        const skip = (page - 1) * perPage;
        const [fixture, total] = await Promise.all([
            fixture_1.default.find(queryParams)
                .skip(skip)
                .limit(perPage)
                .select('-_id -__v')
                .populate({
                path: 'homeTeam',
                select: '-_id -__v',
            })
                .populate({
                path: 'awayTeam',
                select: '-_id -__v',
            })
                .exec(),
            fixture_1.default.countDocuments(queryParams).exec(),
        ]);
        const meta = {
            total,
            page,
            perPage,
            hasMore: total > page * perPage,
            nextPage: total > page * perPage ? page + 1 : null,
        };
        return { fixture, meta };
    },
};
//# sourceMappingURL=fixture.js.map