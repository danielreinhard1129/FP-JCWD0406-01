import { createTransactionAction } from '@/actions/transaction/createTransaction.action';
import { NextFunction, Request, Response } from 'express';

export class TransactionController {
  async createTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await createTransactionAction(req.body)
      return res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getTransactions(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).send('get Transaction success');
    } catch (error) {
      next(error);
    }
  }
  async getTransactionById(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).send('get Transaction by id success');
    } catch (error) {
      next(error);
    }
  }
  async updateTransactionStatus(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      return res.status(200).send('update Transaction status success');
    } catch (error) {
      next(error);
    }
  }
}
