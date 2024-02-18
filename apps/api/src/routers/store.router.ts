import { StoreController } from '@/controllers/store.controller';
import { Router } from 'express';

export class StoreRouter {
  private router: Router;
  private categoriesController: StoreController;

  constructor() {
    this.categoriesController = new StoreController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.categoriesController.getStores);
  }

  getRouter(): Router {
    return this.router;
  }
}
