import { getUserByIdAction } from '@/actions/user/getUserById.action';
import { keeploginAction } from '@/actions/user/keepLogin.action';
import { registerUserAction } from '@/actions/user/registerUser.action';
import { LoginUserAction } from '@/actions/user/userLogin.action';
import { NextFunction, Request, Response } from 'express';

export class UserController {
  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = parseInt(req.params.id, 10);
      const result = await getUserByIdAction(id);
      return res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { usernameOrEmail, password } = req.body;
      const result = await LoginUserAction(usernameOrEmail, password);
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }

  async keepLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body.user;
      const result = await keeploginAction(email);
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }

  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await registerUserAction(req.body);
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }
}
