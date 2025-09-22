import { Router } from 'express';
import {
    registerExpert,
    loginExpert,
    logoutExpert,
    getMyProfile
} from '../controllers/expert.auth.controller.js';
import { verifyExpertJWT } from '../middlewares/expert.auth.middleware.js';

const router = Router();

router.route('/register').post(registerExpert);
router.route('/login').post(loginExpert);

// Secured Routes
router.route('/logout').post(verifyExpertJWT, logoutExpert);
router.route('/me').get(verifyExpertJWT, getMyProfile);

export default router;