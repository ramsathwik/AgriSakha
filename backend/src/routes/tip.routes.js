import { Router } from 'express';
import { verifyExpertJWT } from '../middlewares/expert.auth.middleware.js';
import { verifyFarmerJWT } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import { 
    createTipByExpert,
    submitTipByFarmer,
    getPendingTips,
    approveTip,
    rejectTip,
    getAllTips, 
    getAllTags, 
    getTipsByTag 
} from '../controllers/tip.controller.js';

const router = Router();

// --- PUBLIC ROUTES ---
router.route('/').get(getAllTips);
router.route('/tags').get(getAllTags);
router.route('/tag/:tagId').get(getTipsByTag);

// --- FARMER ROUTES ---
router.route('/submit')
    .post(
        verifyFarmerJWT,
        upload.single('image'),
        submitTipByFarmer
    );

// --- EXPERT ROUTES ---
router.route('/')
    .post(
        verifyExpertJWT, 
        upload.single('image'), 
        createTipByExpert
    );

router.route('/pending').get(verifyExpertJWT, getPendingTips);
router.route('/:tipId/approve').patch(verifyExpertJWT, approveTip);
router.route('/:tipId/reject').patch(verifyExpertJWT, rejectTip);

export default router;