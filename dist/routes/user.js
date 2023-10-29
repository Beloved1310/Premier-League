"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const async_1 = require("../middleware/async");
const user_1 = require("../controller/user");
const router = express_1.default.Router();
router.post('/register', (0, async_1.asyncErrorhandling)(user_1.userController.register));
router.post('/login', (0, async_1.asyncErrorhandling)(user_1.userController.login));
exports.default = router;
//# sourceMappingURL=user.js.map