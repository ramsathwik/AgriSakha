import { Router } from 'express';
import { toggleTipLike } from '../controllers/like.controller.js';
import { verifyUserJWT } from '../middlewares/auth.middleware.js';

const router = Router();

// This route can be accessed by any authenticated user (Farmer or Expert)
router.route('/toggle/tip/:tipId').post(verifyUserJWT, toggleTipLike);

export default router;