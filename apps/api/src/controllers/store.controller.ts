import { getStoresAction } from '@/actions/store/getStores.action';
import { NextFunction, Request, Response } from 'express';

export class StoreController {
  async getStores(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getStoresAction();
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }
}
