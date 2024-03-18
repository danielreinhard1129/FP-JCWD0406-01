import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const validateGetBranchByGeolocation = [
  body('latitude')
    .notEmpty()
    .withMessage('latitude is required')
    .isNumeric()
    .withMessage('latitude must number'),
  body('longitude')
    .notEmpty()
    .withMessage('longitude is required')
    .isNumeric()
    .withMessage('longitude must number'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    next();
  },
];
