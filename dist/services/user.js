"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const tslib_1 = require("tslib");
const user_1 = require("../repositories/user");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const validation_error_1 = tslib_1.__importDefault(require("../utilis/validation-error"));
const not_processed_error_1 = tslib_1.__importDefault(require("../utilis/not-processed-error"));
exports.userService = {
    async createUser(createUser) {
        const user = await user_1.userRepository.getOneUser(createUser.email);
        if (user)
            throw new validation_error_1.default('User already registered. Proceed to login');
        const salt = await bcrypt_1.default.genSalt(10);
        createUser.password = await bcrypt_1.default.hash(createUser.password, salt);
        const savedUser = await user_1.userRepository.createUser(createUser);
        if (!savedUser)
            throw new not_processed_error_1.default('Unsaved User');
        return savedUser;
    },
    async loginUser(loginUser) {
        const user = await user_1.userRepository.getOneUser(loginUser.email);
        if (!user)
            throw new validation_error_1.default('Username or Password not found');
        const validPassword = await bcrypt_1.default.compare(loginUser.password, user.password);
        if (!validPassword)
            throw new validation_error_1.default('Username or Password not found');
        const token = user.generateAuthToken();
        return token;
    },
};
//# sourceMappingURL=user.js.map