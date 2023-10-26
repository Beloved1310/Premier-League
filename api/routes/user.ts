import express from 'express';
import { asyncErrorhandling } from '../middleware/async';
// import { auth } from '../middleware/auth';
import { userController } from '../controller/user';


const router = express.Router();

router.post('/register', asyncErrorhandling(userController.register));
router.post('/login', asyncErrorhandling(userController.login));


export default router;