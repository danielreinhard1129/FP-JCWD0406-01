import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const validateUpdateTransactionStatus = [
  body('statusId')
    .notEmpty()
    .withMessage('statusId is required')
    .isInt()
    .withMessage('statusId must number'),
  body('reason').optional().isString().withMessage('reason must string'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    next();
  },
];
