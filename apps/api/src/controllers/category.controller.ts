import { createCategoryAction } from '@/actions/category/createCategory.action';
import { deleteCategoryAction } from '@/actions/category/deleteCategory.action';
import { getCategoryByTitleAction } from '@/actions/category/getCategoryByTitle.action';
import { updateCategoryAction } from '@/actions/category/updateCategory.action';
import { getAllCategoryRepo } from '@/repositories/categories/getAllCategoryRepo';
import { NextFunction, Request, Response } from 'express';

export class CategoryController {
  // async createCategory(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const result = await createCategoryAction(req);
  //     res.status(result.status).send(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async getAllCategory(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const result = await getAllCategoryRepo();
  //     res.status(200).send(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async updateCategory(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { id } = req.params;
  //     // const result = await updateCategoryAction(
  //     //   parseInt(id, 0),
  //     //   req.body,
  //     //   req.file,
  //     // );
  //     // res.status(result.status).send(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async deleteCategory(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { id } = req.params;
  //     const result = await deleteCategoryAction(parseInt(id, 0));
  //     res.status(result.status).send(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  async getCategoryByTitle(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = Number(req.query.limit)
      const title = String(req.query.title)
      const result = await getCategoryByTitleAction(title, limit)
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }
}
