import { getStocksByIdStoreAction } from '@/actions/stock/getStocksByIdStore.action';
import { updateStockAction } from '@/actions/stock/updateStock.action';
import { NextFunction, Request, Response } from 'express';

export class StockController {
  async getStockByIdStore(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await getStocksByIdStoreAction(parseInt(id, 0));
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updateStock(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await updateStockAction(parseInt(id, 0), req.body);
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }
}
