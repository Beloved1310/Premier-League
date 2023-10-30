"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const config_1 = require("./config");
const logger_1 = require("./utilis/logger");
const app_1 = tslib_1.__importDefault(require("./app"));
const db_1 = require("./startup/db");
(0, db_1.dbConnection)();
app_1.default.listen(config_1.config.PORT, () => {
    (0, logger_1.log)(logger_1.Log.bg.blue, `Web server is running ${config_1.config.PORT}`);
});
//# sourceMappingURL=index.js.map