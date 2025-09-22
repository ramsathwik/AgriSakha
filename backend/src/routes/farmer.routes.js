import { Router } from 'express';
import { getMyProfile, updateMyProfile } from '../controllers/farmer.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validation.middleware.js';
import { farmerProfileUpdateValidator } from '../validators/user.validators.js';

const router = Router();

// All routes in this file require farmer authentication
router.use(verifyJWT(['farmer']));

router.route('/me')
    .get(getMyProfile)
    .patch(farmerProfileUpdateValidator, validate, updateMyProfile);

export default router;