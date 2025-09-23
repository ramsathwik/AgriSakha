import { body, param } from 'express-validator';

export const askQuestionValidator = [
    body('prompt').notEmpty().withMessage('Prompt is required.').isString().withMessage('Prompt must be a string.').trim(),
    body('chatId').optional().isMongoId().withMessage('Invalid chatId format.'),
];

export const getChatValidator = [
    param('chatId').isMongoId().withMessage('Invalid chatId format.'),
];