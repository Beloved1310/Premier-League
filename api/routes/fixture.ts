import express from 'express';
import { asyncErrorhandling } from '../middleware/async';
import { auth } from '../middleware/auth';
import { fixtureController } from '../controller/fixture';


const router = express.Router();

router.post('/', auth, asyncErrorhandling(fixtureController.createFixture));
router.get('/:code', auth,asyncErrorhandling(fixtureController.viewFixture));
router.put('/:code',auth, asyncErrorhandling(fixtureController.updateFixture));
router.delete('/:code', auth, asyncErrorhandling(fixtureController.deleteFixture));
router.get('/', asyncErrorhandling(fixtureController.listFixtures));

export default router;