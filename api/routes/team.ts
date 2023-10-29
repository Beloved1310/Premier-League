import express from 'express'
import { asyncErrorhandling } from '../middleware/async'
import { auth } from '../middleware/auth'
import { isAdmin } from '../middleware/isAdmin'
import { teamController } from '../controller/team'

const router = express.Router()

router.post('/', auth, isAdmin, asyncErrorhandling(teamController.createTeam))
router.get('/:code', auth, asyncErrorhandling(teamController.viewTeam))
router.put(
  '/:code',
  auth,
  isAdmin,
  asyncErrorhandling(teamController.updateTeam),
)
router.delete(
  '/:code',
  auth,
  isAdmin,
  asyncErrorhandling(teamController.deleteTeam),
)
router.get('/', asyncErrorhandling(teamController.listTeams))

export default router
