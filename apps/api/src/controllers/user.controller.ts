import { getUserByIdAction } from '@/actions/user/getUserById.action';
import { NextFunction, Request, Response } from 'express';

export class UserController {
  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      const result = await getUserByIdAction(id);
      return res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }
}
