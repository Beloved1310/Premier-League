"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const nanoid_1 = require("nanoid");
const nanoid = (0, nanoid_1.customAlphabet)('0123456789AQWXSCZEDCVFRTGBHYNJUIKLOPaqwxszedcvfrtgbnhyujmkiolp', 17);
const FixtureSchema = new mongoose_1.Schema({
    code: {
        type: String,
        default: () => 'fix_' + nanoid(),
    },
    homeTeam: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Team',
    },
    awayTeam: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Team',
    },
    kickoffTime: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        default: 'pending',
    },
    result: {
        type: String,
        default: 'Not Played',
    },
});
FixtureSchema.index({ homeTeam: 1, kickoffTime: 1 });
FixtureSchema.index({ awayTeam: 1, kickoffTime: 1 });
exports.default = mongoose_1.default.model('Fixture', FixtureSchema);
//# sourceMappingURL=fixture.js.map