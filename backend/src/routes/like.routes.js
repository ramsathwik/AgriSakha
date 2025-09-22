import { Router } from 'express';
import { toggleTipLike } from '../controllers/like.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { mongoIdValidator } from '../validators/common.validators.js';
import { validate } from '../middlewares/validation.middleware.js';

const router = Router();

router.route('/toggle/tip/:tipId').post(
    mongoIdValidator('tipId'), 
    validate,
    verifyJWT(['farmer', 'expert']), 
    toggleTipLike
);

export default router;