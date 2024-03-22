// import { getProductsAction } from '@/actions/product/getProductsRepo.action';
import { getProductByIdAction } from '@/actions/product/getProductById.action';
import { NextFunction, Request, Response } from 'express';
import { createProductAction } from '@/actions/product/createProduct.action';
import { updateProductAction } from '@/actions/product/updateProduct.action';
import { deleteProductAction } from '@/actions/product/deleteProduct.action';
import { IFilter } from '@/type.api/filter.type';
import { getProductsAction } from '@/actions/product/getProducts.action';

export class ProductController {
  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      const result = await getProductByIdAction(id);
      return res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = Number(req.query.limit);
      const result = await getProductsAction(limit);
      return res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }

  // async getProducts(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     let search = '';
  //     let filterCategory: IFilter = {};
  //     if (req.query.search) {
  //       search = req.query.search as string;
  //     }

  //     if (req.query.category1) {
  //       console.log(req.query.category1);

  //       filterCategory.category1 = parseInt(req.query.category1 as string, 0);
  //     }

  //     if (req.query.category2) {
  //       filterCategory.category2 = parseInt(req.query.category2 as string, 0);
  //     }
  //     if (req.query.category3) {
  //       filterCategory.category3 = parseInt(req.query.category3 as string, 0);
  //     }

  //     const result = await getProductsAction(search, filterCategory);
  //     return res.status(result.status).send(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async getProductByIdProduct(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const id = parseInt(req.params.id, 10);
  //     const result = await getProductByIdAction(id);
  //     return res.status(result.status).send(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async createProduct(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const result = await createProductAction(req);

  //     res.status(result.status).send(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  // async editProduct(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { id } = req.params;
  //     // const result = await updateProductAction(
  //     //   parseInt(id, 0),
  //     //   req.body,
  //     //   req.file,
  //     // );
  //     // res.status(result.status).send(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  // async deleteProduct(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { id } = req.params;
  //     const result = await deleteProductAction(parseInt(id, 0));
  //     res.status(result.status).send(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
