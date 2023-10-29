"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const async_1 = require("../middleware/async");
const auth_1 = require("../middleware/auth");
const isAdmin_1 = require("../middleware/isAdmin");
const fixture_1 = require("../controller/fixture");
const router = express_1.default.Router();
router.post('/', auth_1.auth, isAdmin_1.isAdmin, (0, async_1.asyncErrorhandling)(fixture_1.fixtureController.createFixture));
router.get('/:code', auth_1.auth, (0, async_1.asyncErrorhandling)(fixture_1.fixtureController.viewFixture));
router.put('/:code', auth_1.auth, isAdmin_1.isAdmin, (0, async_1.asyncErrorhandling)(fixture_1.fixtureController.updateFixture));
router.delete('/:code', auth_1.auth, isAdmin_1.isAdmin, (0, async_1.asyncErrorhandling)(fixture_1.fixtureController.deleteFixture));
router.get('/pending/list', auth_1.auth, (0, async_1.asyncErrorhandling)(fixture_1.fixtureController.listPendingFixtures));
router.get('/completed/list', auth_1.auth, (0, async_1.asyncErrorhandling)(fixture_1.fixtureController.listCompletedFixtures));
router.get('/', (0, async_1.asyncErrorhandling)(fixture_1.fixtureController.listFixtures));
exports.default = router;
//# sourceMappingURL=fixture.js.map