"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const auth = (req, res, next) => {
    const token = req.header('authorization');
    if (!token) {
        return res
            .status(401)
            .send({ message: 'Access denied. No token provided' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token.split(' ')[1], config_1.config.JWT);
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(400).send({ message: 'Invalid token.' });
    }
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map