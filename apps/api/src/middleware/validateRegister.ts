import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const validateRegister = [
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email not invalid')
    .isString()
    .withMessage('email must string'),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 6 })
    .withMessage('password min 6 character'),
  body('username')
    .notEmpty()
    .withMessage('username is required')
    .isString()
    .withMessage('username must string'),
  body('phone')
    .notEmpty()
    .withMessage('phone is required')
    .isNumeric()
    .withMessage('phone must number'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    next();
  },
];
