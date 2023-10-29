"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const nanoid_1 = require("nanoid");
const nanoid = (0, nanoid_1.customAlphabet)('0123456789AQWXSCZEDCVFRTGBHYNJUIKLOPaqwxszedcvfrtgbnhyujmkiolp', 17);
const TeamSchema = new mongoose_1.Schema({
    code: {
        type: String,
        default: () => 'tem_' + nanoid(),
    },
    name: { type: String, required: true },
    country: { type: String, required: true },
    founded: { type: Number, required: true },
});
TeamSchema.index({ name: 1 });
TeamSchema.index({ country: 1 });
TeamSchema.index({ founded: 1 });
exports.default = mongoose_1.default.model('Team', TeamSchema);
//# sourceMappingURL=team.js.map