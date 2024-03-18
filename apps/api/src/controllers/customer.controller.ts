import { getCustomerByIdAction } from '@/actions/customer/getCustomerById.action';
import { NextFunction, Request, Response } from 'express';

export class CustomerController {
  async getCustomerById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      const result = await getCustomerByIdAction(id);
      return res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }
}
