import { Router } from 'express';
import {
    registerExpert,
    loginExpert,
    logoutExpert
} from '../controllers/expert.auth.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { 
    expertRegisterValidator, 
    expertLoginValidator 
} from '../validators/expert.auth.validators.js';
import { validate } from '../middlewares/validation.middleware.js';

const router = Router();

router.route('/register').post(expertRegisterValidator, validate, registerExpert);
router.route('/login').post(expertLoginValidator, validate, loginExpert);
router.route('/logout').post(verifyJWT(['expert']), logoutExpert);

export default router;