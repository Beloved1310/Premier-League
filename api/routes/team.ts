import express from 'express';
import { asyncErrorhandling } from '../middleware/async';
import { auth } from '../middleware/auth';
import { teamController } from '../controller/team';


const router = express.Router();

router.post('/', auth, asyncErrorhandling(teamController.createTeam));
router.get('/', auth,asyncErrorhandling(teamController.listTeams));
router.put('/:code',auth, asyncErrorhandling(teamController.updateTeam));
router.delete('/:code', auth, asyncErrorhandling(teamController.deleteTeam));


export default router;