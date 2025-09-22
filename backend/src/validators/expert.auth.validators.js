import { body } from 'express-validator';

export const expertRegisterValidator = [
    body('fullName').notEmpty().withMessage('Full name is required.').trim(),
    body('email').notEmpty().withMessage('Email is required.').isEmail().withMessage('Invalid email format.').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required.').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
    body('secretKey').notEmpty().withMessage('Secret key is required.'),
];

export const expertLoginValidator = [
    body('email').notEmpty().withMessage('Email is required.').isEmail().withMessage('Invalid email format.').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required.'),
];