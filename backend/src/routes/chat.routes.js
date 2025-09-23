import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validation.middleware.js';
import { askQuestion, getAllChatsForFarmer, getChatHistory } from '../controllers/chat.controller.js';
import { askQuestionValidator, getChatValidator } from '../validators/chat.validators.js';

const router = Router();

// All routes in this file require farmer authentication
router.use(verifyJWT(['farmer']));

router.route('/ask').post(askQuestionValidator, validate, askQuestion);
router.route('/').get(getAllChatsForFarmer);
router.route('/:chatId').get(getChatValidator, validate, getChatHistory);

export default router;