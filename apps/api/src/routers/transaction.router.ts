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
    this.router.patch(
      '/status/:transaction_id',
      this.transactionController.updateTransactionStatus,
    );
    this.router.patch(
      '/payment_proof/:transaction_id',
      this.transactionController.updateTransactionPaymentProof,
    );
    this.router.post(
      '/filter/date',
      this.transactionController.getTransactionByDate,
    );
    this.router.post(
      '/status/midtrans/:transaction_id',
      this.transactionController.updateStatusByMidtrans,
    );
    this.router.post(
      '/filter/branchId',
      this.transactionController.getTransactionByBranchId,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
