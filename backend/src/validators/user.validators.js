import { body } from 'express-validator';
import { adminContacts } from '../constants.js';

const availableDistricts = Object.keys(adminContacts);

export const farmerProfileUpdateValidator = [
    body('fullName').optional().notEmpty().withMessage('Full name cannot be empty.').trim(),
    body('dateOfBirth').optional().isISO8601().toDate().withMessage('Invalid date format. Please use YYYY-MM-DD.'),
    body('gender').optional().isIn(['male', 'female', 'other']).withMessage('Invalid gender.'),
    body('address').optional().isObject().withMessage('Address must be an object.'),
    body('address.fullAddress').optional({ checkFalsy: true }).notEmpty().withMessage('Full address is required when updating address.'),
    body('address.district').optional({ checkFalsy: true }).isIn(availableDistricts).withMessage('Invalid district provided.'),
];

export const expertProfileUpdateValidator = [
    body('fullName').optional().notEmpty().withMessage('Full name cannot be empty.').trim(),
    body('expertise').optional().isArray().withMessage('Expertise must be an array.')
        .custom((value) => {
            if (value.some(item => typeof item !== 'string' || item.trim() === '')) {
                throw new Error('All items in expertise must be non-empty strings.');
            }
            return true;
        }),
];