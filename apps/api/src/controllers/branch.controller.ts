import { getBranchByGeolocationAction } from '@/actions/branch/getBranchByGeolocation.action';
import { getBranchsAction } from '@/actions/branch/getBranchs.action';
import { NextFunction, Request, Response } from 'express';

export class BranchController {
  async getBranchs(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getBranchsAction();
      return res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getBranchByGeolocation(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await getBranchByGeolocationAction(req.body);
      return res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }
}
