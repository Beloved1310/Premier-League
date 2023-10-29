"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const nanoid_1 = require("nanoid");
const nanoid = (0, nanoid_1.customAlphabet)('0123456789AQWXSCZEDCVFRTGBHYNJUIKLOPaqwxszedcvfrtgbnhyujmkiolp', 17);
const UserSchema = new mongoose_1.default.Schema({
    code: {
        type: String,
        default: () => 'usr_' + nanoid(),
    },
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: { type: Boolean, default: false },
}, { timestamps: true });
UserSchema.methods.generateAuthToken = function generatedToken() {
    const user = this;
    const expiresIn = 60 * 60;
    const token = jsonwebtoken_1.default.sign({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        isAdmin: user.isAdmin,
        exp: Math.floor(Date.now() / 1000) + expiresIn,
    }, config_1.config.JWT);
    return token;
};
exports.default = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=user.js.map