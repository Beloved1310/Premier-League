"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const config_1 = require("../config");
const logger_1 = require("../utilis/logger");
const { MONGODBURI } = config_1.config;
const dbConnection = async () => {
    try {
        await mongoose_1.default.connect(MONGODBURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        (0, logger_1.log)(logger_1.Log.bg.blue, `Connected to Database`);
    }
    catch (error) {
        console.error('Error connecting to Database:', error);
    }
};
exports.dbConnection = dbConnection;
//# sourceMappingURL=db.js.map