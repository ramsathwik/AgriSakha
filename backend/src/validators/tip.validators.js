import { body } from 'express-validator';

export const tipCreateValidator = [
    body('title').notEmpty().withMessage('Title is required.').trim().isLength({ min: 5 }).withMessage('Title must be at least 5 characters long.'),
    body('content').notEmpty().withMessage('Content is required.').trim().isLength({ min: 20 }).withMessage('Content must be at least 20 characters long.'),
    body('tags').notEmpty().withMessage('Tags are required.').isString().withMessage('Tags must be a comma-separated string.'),
];

export const tipUpdateValidator = [
    body('title').optional().trim().isLength({ min: 5 }).withMessage('Title must be at least 5 characters long.'),
    body('content').optional().trim().isLength({ min: 20 }).withMessage('Content must be at least 20 characters long.'),
    body('tags').optional().isString().withMessage('Tags must be a comma-separated string.'),
];

export const rejectTipValidator = [
    body('reason').notEmpty().withMessage('A reason for rejection is required.').trim(),
];