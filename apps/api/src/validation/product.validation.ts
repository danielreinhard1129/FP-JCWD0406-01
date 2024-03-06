import { body } from 'express-validator';

export const productValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price')
    .notEmpty()
    .withMessage('price is required'),
  body('weight').notEmpty().withMessage('weight is required'),
  body('unitWeight').notEmpty().withMessage('unit weight is required'),
  body('categoryId')
    .notEmpty()
    .withMessage('categoryId is required')
];
