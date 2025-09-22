import { param } from 'express-validator';
import mongoose from 'mongoose';


export const mongoIdValidator = (idName) => [
    param(idName).notEmpty().isMongoId().withMessage(`Invalid ${idName} format.`),
];