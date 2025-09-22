import { Router } from 'express';
import { 
    signup, 
    sendLoginOtp, 
    verifyOtpAndLogin, 
    logoutUser 
} from '../controllers/auth.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { 
    farmerSignupValidator, 
    sendLoginOtpValidator, 
    verifyOtpValidator 
} from '../validators/auth.validators.js';
import { validate } from '../middlewares/validation.middleware.js';

const router = Router();

router.route('/signup').post(farmerSignupValidator, validate, signup);

router.route('/send-login-otp').post(sendLoginOtpValidator, validate, sendLoginOtp);

router.route('/verify-otp').post(verifyOtpValidator, validate, verifyOtpAndLogin);

router.route('/logout').post(verifyJWT(['farmer']), logoutUser);

export default router;