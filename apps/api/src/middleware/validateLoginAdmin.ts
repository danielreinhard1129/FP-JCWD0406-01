import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const validateLoginAdmin = [
  body('usernameOrEmail')
    .notEmpty()
    .withMessage('usernameOrEmail is required')
    .isString()
    .withMessage('usernameOrEmail must string'),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 6 })
    .withMessage('password min 6 character'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    next();
  },
];
