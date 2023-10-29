"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const tslib_1 = require("tslib");
const user_1 = tslib_1.__importDefault(require("../model/user"));
exports.userRepository = {
    async getOneUser(email) {
        const user = await user_1.default.findOne({ email }).select('-_id -__v');
        return user;
    },
    async createUser(createUser) {
        const savedUser = await user_1.default.create(createUser);
        const { _id, __v, password, ...data } = savedUser.toObject();
        return data;
    },
};
//# sourceMappingURL=user.js.map