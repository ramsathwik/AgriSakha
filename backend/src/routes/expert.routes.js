import { Router } from 'express';
import { getMyProfile, updateMyProfile } from '../controllers/expert.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { expertProfileUpdateValidator } from '../validators/user.validators.js';
import { validate } from '../middlewares/validation.middleware.js';

const router = Router();

// All routes here are for authenticated experts
router.use(verifyJWT(['expert']));

router.route('/me')
    .get(getMyProfile)
    .patch(expertProfileUpdateValidator, validate, updateMyProfile);

export default router;