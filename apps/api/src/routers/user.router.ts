import { UserController } from '@/controllers/user.controller';
import { verifyToken } from '@/middleware/jwtVerifyToken';
import { validateLogin } from '@/middleware/validateLogin';
import { validateRegister } from '@/middleware/validateRegister';
import { Router } from 'express';

export class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/keeplogin', verifyToken, this.userController.keepLogin);
    this.router.post('/login', validateLogin, this.userController.loginUser);
    this.router.post(
      '/register',
      validateRegister,
      this.userController.registerUser,
    );
    this.router.get('/:id', this.userController.getUserById);
  }

  getRouter(): Router {
    return this.router;
  }
}
