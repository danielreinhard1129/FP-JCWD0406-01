import { BranchController } from '@/controllers/branch.controller';
import { Router } from 'express';

export class BranchRouter {
  private router: Router;
  private branchController: BranchController;

  constructor() {
    this.branchController = new BranchController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.branchController.getBranchs);
    this.router.post(
      '/select/branch',
      this.branchController.getBranchByGeolocation,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
