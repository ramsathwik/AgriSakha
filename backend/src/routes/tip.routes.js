import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
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
import { validate } from '../middlewares/validation.middleware.js';
import { mongoIdValidator } from '../validators/common.validators.js';
import { 
    tipCreateValidator, 
    rejectTipValidator 
} from '../validators/tip.validators.js';

const router = Router();

// --- PUBLIC ROUTES ---
router.route('/').get(getAllTips);
router.route('/tags').get(getAllTags);
router.route('/tag/:tagId').get(mongoIdValidator('tagId'), validate, getTipsByTag);

// --- FARMER ROUTES ---
router.route('/submit')
    .post(
        verifyJWT(['farmer']),
        upload.single('image'),
        tipCreateValidator,
        validate,
        submitTipByFarmer
    );

// --- EXPERT ROUTES ---
router.route('/')
    .post(
        verifyJWT(['expert']), 
        upload.single('image'), 
        tipCreateValidator,
        validate,
        createTipByExpert
    );

router.route('/pending').get(verifyJWT(['expert']), getPendingTips);
router.route('/:tipId/approve').patch(mongoIdValidator('tipId'), validate, verifyJWT(['expert']), approveTip);
router.route('/:tipId/reject').patch(mongoIdValidator('tipId'), rejectTipValidator, validate, verifyJWT(['expert']), rejectTip);

export default router;