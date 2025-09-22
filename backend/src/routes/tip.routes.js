import { Router } from 'express';
import { verifyExpertJWT } from '../middlewares/expert.auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import { 
    createTip, 
    getAllTips, 
    getAllTags, 
    getTipsByTag 
} from '../controllers/tip.controller.js';

const router = Router();

// Public routes
router.route('/').get(getAllTips);
router.route('/tags').get(getAllTags);
router.route('/tag/:tagId').get(getTipsByTag);

// Secured routes (for Experts only)
router.route('/')
    .post(
        verifyExpertJWT, 
        upload.single('image'), 
        createTip
    );

export default router;