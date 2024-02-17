import { createCategoryAction } from '@/actions/categories/createCategory.action';
import { deleteCategoryAction } from '@/actions/categories/deleteCategory.action';
import { updateCategoryAction } from '@/actions/categories/updateCategory.action';
import { getAllCategoryRepo } from '@/repositories/categories/getAllCategoryRepo';
import { NextFunction, Request, Response } from 'express';

export class CategoriesController {
  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await createCategoryAction(req);
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getAllCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getAllCategoryRepo();
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await updateCategoryAction(
        parseInt(id, 0),
        req.body,
        req.file,
      );
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await deleteCategoryAction(parseInt(id, 0));
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }
}
