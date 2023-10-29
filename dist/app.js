"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const user_1 = tslib_1.__importDefault(require("./routes/user"));
const team_1 = tslib_1.__importDefault(require("./routes/team"));
const fixture_1 = tslib_1.__importDefault(require("./routes/fixture"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const express_rate_limit_1 = tslib_1.__importDefault(require("express-rate-limit"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000,
    max: 100,
    message: 'Too many requests, please try again later.',
});
app.use((0, cors_1.default)({ origin: '*' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    return res.send('OK');
});
app.use('/user', limiter, user_1.default);
app.use('/team', limiter, team_1.default);
app.use('/fixture', limiter, fixture_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map