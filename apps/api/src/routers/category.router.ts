import { CategoryController } from '@/controllers/category.controller';
import { upload } from '@/helpers/multer';
import { Router } from 'express';

export class CategoryRouter {
  private router: Router;
  private categoriesController: CategoryController;

  constructor() {
    this.categoriesController = new CategoryController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // this.router.get('/', this.categoriesController.getAllCategory);
    // this.router.post(
    //   '/create-category',
    //   // upload('categories'),
    //   createCategoryValidation,
    //   this.categoriesController.createCategory,
    // );
    // this.router.put(
    //   '/update-category/:id',
    //   // upload('categories'),
    //   this.categoriesController.updateCategory,
    // );
    // this.router.delete(
    //   '/delete-category',
    //   this.categoriesController.deleteCategory,
    // );
    this.router.get('/filter', this.categoriesController.getCategoryByTitle);
  }

  getRouter(): Router {
    return this.router;
  }
}
