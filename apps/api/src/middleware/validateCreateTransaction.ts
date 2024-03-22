import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const validateCreateTransaction = [
  body('products')
    .isArray()
    .withMessage('products harus berupa array')
    .notEmpty()
    .withMessage('products must required'),
  body('address')
    .notEmpty()
    .withMessage('address is required')
    .isString()
    .withMessage('address must string'),
  body('amount')
    .notEmpty()
    .withMessage('amount must required')
    .isInt()
    .withMessage('amount must number'),
  body('userId')
    .notEmpty()
    .withMessage('userId must required')
    .isInt()
    .withMessage('userId must number'),
  body('message').isString().withMessage('message must string'),
  body('branchId')
    .notEmpty()
    .withMessage('branchId must required')
    .isInt()
    .withMessage('branchId must number'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    next();
  },
];
