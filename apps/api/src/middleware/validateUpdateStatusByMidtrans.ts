import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const validateUpdateStatusByMidtrans = [
  body('transactionStatus')
    .notEmpty()
    .withMessage('transactionStatus is required')
    .isString()
    .withMessage('transactionStatus must string'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    next();
  },
];
