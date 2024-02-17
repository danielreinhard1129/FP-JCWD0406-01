import { getProductsAction } from '@/actions/product/getProducts.action';
import { getProductByIdAction } from '@/actions/product/getProductById.action';
import { NextFunction, Request, Response } from 'express';

export class ProductController {
  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getProductsAction();
      return res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getProductByIdAction(req.body.id);
      return res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }
}
