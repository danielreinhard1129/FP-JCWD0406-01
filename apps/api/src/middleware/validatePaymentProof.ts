import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const validatePaymentProof = [
  body('paymentProof')
    .notEmpty()
    .withMessage('paymentProof is required')
    .isString()
    .withMessage('usernameOrEmail must string'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    next();
  },
];
