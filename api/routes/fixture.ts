import express from 'express'
import { asyncErrorhandling } from '../middleware/async'
import { auth } from '../middleware/auth'
import { isAdmin } from '../middleware/isAdmin'
import { fixtureController } from '../controller/fixture'

const router = express.Router()

router.post(
  '/',
  auth,
  isAdmin,
  asyncErrorhandling(fixtureController.createFixture),
)
router.get('/:code', auth, asyncErrorhandling(fixtureController.viewFixture))
router.put(
  '/:code',
  auth,
  isAdmin,
  asyncErrorhandling(fixtureController.updateFixture),
)
router.delete(
  '/:code',
  auth,
  isAdmin,
  asyncErrorhandling(fixtureController.deleteFixture),
)
router.get('/pending/list', auth, asyncErrorhandling(fixtureController.listPendingFixtures))
router.get(
  '/completed/list',
  auth,
  asyncErrorhandling(fixtureController.listCompletedFixtures),
)
router.get('/', asyncErrorhandling(fixtureController.listFixtures))

export default router
