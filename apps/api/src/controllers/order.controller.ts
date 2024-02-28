import { getOrdersRepo } from '@/repositories/order/getOrdersRepo';
import { NextFunction, Request, Response } from 'express';

export class OrderController {
  async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { startDate, endDate, categoryId, search } = req.query;
      const result = await getOrdersRepo(
        parseInt(id, 0),
        startDate as string,
        endDate as string,
        parseInt(categoryId as string, 0),
        search as string,
      );
      res
        .status(200)
        .send({ message: 'succes get data', status: 200, data: result });
    } catch (error) {
      next(error);
    }
  }
}
