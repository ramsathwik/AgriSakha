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
    getTipsByTag,
    updateTip,
    deleteTip,
    getMyTips
} from '../controllers/tip.controller.js';
import { validate } from '../middlewares/validation.middleware.js';
import { mongoIdValidator } from '../validators/common.validators.js';
import { 
    tipCreateValidator,
    tipUpdateValidator, 
    rejectTipValidator 
} from '../validators/tip.validators.js';

const router = Router();

// --- PUBLIC ROUTES ---
router.route('/').get(getAllTips);
router.route('/tags').get(getAllTags);
router.route('/tag/:tagId').get(mongoIdValidator('tagId'), validate, getTipsByTag);

// --- AUTHENTICATED USER ROUTES (FARMER & EXPERT) ---
router.route('/my-tips').get(verifyJWT(['farmer', 'expert']), getMyTips);

router.route('/:tipId')
    .patch(
        verifyJWT(['farmer', 'expert']),
        upload.single('image'),
        mongoIdValidator('tipId'),
        tipUpdateValidator,
        validate,
        updateTip
    )
    .delete(
        verifyJWT(['farmer', 'expert']),
        mongoIdValidator('tipId'),
        validate,
        deleteTip
    );

// --- FARMER-SPECIFIC ROUTES ---
router.route('/submit')
    .post(
        verifyJWT(['farmer']),
        upload.single('image'),
        tipCreateValidator,
        validate,
        submitTipByFarmer
    );

// --- EXPERT-SPECIFIC ROUTES ---
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