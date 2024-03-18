import { LoginAdminAction } from '@/actions/admin/adminLogin.action';
import { keepLoginAdminAction } from '@/actions/admin/keepLoginAdmin.action';
import { registerAdminAction } from '@/actions/admin/registerAdmin.action';
import { NextFunction, Request, Response } from 'express';

export class AdminController {
  async loginAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { usernameOrEmail, password } = req.body;
      const result = await LoginAdminAction(usernameOrEmail, password);
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }

  async keepLoginAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body.user;
      const result = await keepLoginAdminAction(email);
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }

  async registerAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const result = await registerAdminAction(data);
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }
}
