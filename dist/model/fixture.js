"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const nanoid_1 = require("nanoid");
const nanoid = (0, nanoid_1.customAlphabet)('0123456789AQWXSCZEDCVFRTGBHYNJUIKLOPaqwxszedcvfrtgbnhyujmkiolp', 17);
// Create a schema for the fixture
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
        default: 'pending'
    },
    result: {
        type: String,
        default: 'Not Played', // You can set a default value or use a different type for results
    },
    // Add other fixture-specific properties as needed
});
// Create a model for the fixture
exports.default = mongoose_1.default.model('Fixture', FixtureSchema);
//# sourceMappingURL=fixture.js.map