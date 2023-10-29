"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const async_1 = require("../middleware/async");
const auth_1 = require("../middleware/auth");
const isAdmin_1 = require("../middleware/isAdmin");
const team_1 = require("../controller/team");
const router = express_1.default.Router();
router.post('/', auth_1.auth, isAdmin_1.isAdmin, (0, async_1.asyncErrorhandling)(team_1.teamController.createTeam));
router.get('/:code', auth_1.auth, (0, async_1.asyncErrorhandling)(team_1.teamController.viewTeam));
router.put('/:code', auth_1.auth, isAdmin_1.isAdmin, (0, async_1.asyncErrorhandling)(team_1.teamController.updateTeam));
router.delete('/:code', auth_1.auth, isAdmin_1.isAdmin, (0, async_1.asyncErrorhandling)(team_1.teamController.deleteTeam));
router.get('/', (0, async_1.asyncErrorhandling)(team_1.teamController.listTeams));
exports.default = router;
//# sourceMappingURL=team.js.map