import { AdminController } from '@/controllers/admin.controoler';
import { verifyToken } from '@/middleware/jwtVerifyToken';
import { validateLoginAdmin } from '@/middleware/validateLoginAdmin';
import { validateRegisterAdmin } from '@/middleware/validateRegisterAdmin';
import { Router } from 'express';

export class AdminRouter {
  private router: Router;
  private adminController: AdminController;

  constructor() {
    this.adminController = new AdminController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/register',
      validateRegisterAdmin,
      this.adminController.registerAdmin,
    );
    this.router.post(
      '/login',
      validateLoginAdmin,
      this.adminController.loginAdmin,
    );
    this.router.get(
      '/keeplogin',
      verifyToken,
      this.adminController.keepLoginAdmin,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
