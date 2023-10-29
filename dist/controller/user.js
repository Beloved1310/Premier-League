"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_1 = require("../validation/user");
const user_2 = require("../services/user");
const response_1 = require("../services/response");
exports.userController = {
    async register(req, res) {
        const { value, error } = user_1.userValidation.create.validate(req.body);
        if (error)
            return res.status(400).send({ error: error.details[0].message });
        if (value.email === 'admin@prelea.com') {
            value.isAdmin = true;
        }
        const data = await user_2.userService.createUser(value);
        return response_1.ResponseService.success(res, 'Welcome! You have successfully sign up. Proceed to login', data);
    },
    async login(req, res) {
        const { value, error } = user_1.userValidation.login.validate(req.body);
        if (error)
            return res.status(400).send({ error: error.details[0].message });
        const { email } = value;
        const token = await user_2.userService.loginUser(value);
        res.header('authorization', token);
        const data = { email, token };
        return response_1.ResponseService.success(res, 'Login Successful', data);
    },
};
//# sourceMappingURL=user.js.map