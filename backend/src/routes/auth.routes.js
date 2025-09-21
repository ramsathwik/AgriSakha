import { Router } from 'express';
import { 
    signup, 
    sendLoginOtp, 
    verifyOtpAndLogin, 
    logoutUser 
} from '../controllers/auth.controller.js';
import { verifyFarmerJWT } from '../middlewares/auth.middleware.js'; // Assuming you have this middleware

const router = Router();

router.route('/signup').post(signup);

router.route('/send-login-otp').post(sendLoginOtp);

router.route('/verify-otp').post(verifyOtpAndLogin);


router.route('/logout').post(verifyFarmerJWT, logoutUser);


export default router;