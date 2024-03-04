import { StoreAdminController } from '@/controllers/storeAdmin.controller';
import { Router } from 'express';

export class StoreAdminRouter {
  private router: Router;
  private storeAdminController: StoreAdminController;

  constructor() {
    this.storeAdminController = new StoreAdminController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.storeAdminController.getStoreAdmins);
    this.router.post('/', this.storeAdminController.addStoreAdmins);
    this.router.patch('/:id', this.storeAdminController.updateStoreAdmin);
    this.router.delete('/:id', this.storeAdminController.deleteStoreAdmin);
  }

  getRouter(): Router {
    return this.router;
  }
}
