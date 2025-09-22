import { Router } from 'express';
import {
    registerExpert,
    loginExpert,
    logoutExpert,
    getMyProfile
} from '../controllers/expert.auth.controller.js';
import { verifyExpertJWT } from '../middlewares/expert.auth.middleware.js';
import { 
    expertRegisterValidator, 
    expertLoginValidator 
} from '../validators/expert.auth.validators.js';
import { validate } from '../middlewares/validation.middleware.js';

const router = Router();

router.route('/register').post(expertRegisterValidator, validate, registerExpert);
router.route('/login').post(expertLoginValidator, validate, loginExpert);

// Secured Routes
router.route('/logout').post(verifyExpertJWT, logoutExpert);
router.route('/me').get(verifyExpertJWT, getMyProfile);

export default router;