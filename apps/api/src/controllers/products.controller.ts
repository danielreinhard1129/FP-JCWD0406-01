import { createProductAction } from '@/actions/products/createProduct.action';
import { deleteProductAction } from '@/actions/products/deleteProduct.action';
import { updateProductAction } from '@/actions/products/updateProduct.action';
import { getAllProductRepo } from '@/repositories/products/getAllProductRepo';
import { NextFunction, Request, Response } from 'express';

export class ProductsController {
  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await createProductAction(req);
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }
  async getAllProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getAllProductRepo();
      res.status(200).send({ data: result });
    } catch (error) {
      next(error);
    }
  }
  async editProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await updateProductAction(
        parseInt(id, 0),
        req.body,
        req.file,
      );
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }
  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await deleteProductAction(parseInt(id, 0));
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }
}
