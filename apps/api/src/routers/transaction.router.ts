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
    this.router.post('/', this.transactionController.createTransaction);
    this.router.get('/', this.transactionController.getTransactions);
    this.router.get(
      '/filter/:transaction_id',
      this.transactionController.getTransactionById,
    );
    this.router.put(
      '/status/:transaction_id',
      this.transactionController.updateTransactionStatus,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
