import { getProductsAction } from '@/actions/product/getProducts.action';
import { getProductByIdAction } from '@/actions/product/getProductById.action';
import { NextFunction, Request, Response } from 'express';
import { createProductAction } from '@/actions/product/createProduct.action';
import { updateProductAction } from '@/actions/product/updateProduct.action';
import { deleteProductAction } from '@/actions/product/deleteProduct.action';

export class ProductController {
  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      let search = '';
      if (req.query.search) {
        search = req.query.search as string;
      }
      const result = await getProductsAction(search);
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

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await createProductAction(req);

      res.status(result.status).send(result);
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
