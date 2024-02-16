import { TransactionController } from '@/controllers/transaction.controller';
import { Router } from 'express';

export class TransactionRouter {
  private router: Router;
  private transactionController: TransactionController;

  constructor() {
    this.transactionController = new TransactionController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/create', this.transactionController.createTransaction);
    this.router.post('/', this.transactionController.getTransactions);
    this.router.post(
      '/filter/id',
      this.transactionController.getTransactionById,
    );
    this.router.post(
      '/status',
      this.transactionController.updateTransactionStatus,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
