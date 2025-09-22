import { body } from 'express-validator';

export const farmerSignupValidator = [
    body('fullName').notEmpty().withMessage('Full name is required.').trim(),
    body('phone').notEmpty().withMessage('Phone number is required.').isMobilePhone('en-IN').withMessage('Invalid Indian mobile number format.'),
    body('address.fullAddress').notEmpty().withMessage('Full address is required.'),
    body('address.district').notEmpty().withMessage('District is required.'),
];

export const sendLoginOtpValidator = [
    body('phone').notEmpty().withMessage('Phone number is required.').isMobilePhone('en-IN').withMessage('Invalid Indian mobile number format.'),
];

export const verifyOtpValidator = [
    body('phone').notEmpty().withMessage('Phone number is required.').isMobilePhone('en-IN').withMessage('Invalid Indian mobile number format.'),
    body('otp').notEmpty().withMessage('OTP is required.').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits.'),
];