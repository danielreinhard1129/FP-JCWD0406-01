import { TransactionController } from '@/controllers/transaction.controller';
import { validateCreateTransaction } from '@/middleware/validateCreateTransaction';
import { validatePaymentProof } from '@/middleware/validatePaymentProof';
import { validateUpdateStatusByMidtrans } from '@/middleware/validateUpdateStatusByMidtrans';
import { validateUpdateTransactionStatus } from '@/middleware/validateUpdateTransactionStatus';
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
    this.router.post(
      '/',
      validateCreateTransaction,
      this.transactionController.createTransaction,
    );
    this.router.get('/', this.transactionController.getTransactions);
    this.router.get('/:id', this.transactionController.getTransactionById);

    this.router.patch(
      '/:id/status',
      validateUpdateTransactionStatus,
      this.transactionController.updateTransactionStatus,
    );

    this.router.patch(
      '/:id/payment-proof',
      validatePaymentProof,
      this.transactionController.updateTransactionPaymentProof,
    );

    this.router.get(
      '/filter/date',
      this.transactionController.getTransactionByDate,
    );

    this.router.post(
      '/status/midtrans/:id',
      validateUpdateStatusByMidtrans,
      this.transactionController.updateStatusByMidtrans,
    );

    this.router.get(
      '/filter/branch',
      this.transactionController.getTransactionByBranchId,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
