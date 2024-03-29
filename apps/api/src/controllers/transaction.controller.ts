import { createTransactionAction } from '@/actions/transaction/createTransaction.action';
import { getTransactionByDateAction } from '@/actions/transaction/getTransactionByDate.action';
import { getTransactionByIdAction } from '@/actions/transaction/getTransactionById.action';
import { getTransactionsAction } from '@/actions/transaction/getTransactions.action';
import { getTransactionsByBranchIdAction } from '@/actions/transaction/getTransactionsByBranchId';
import { updateStatusByMidtransAction } from '@/actions/transaction/updateStatusByMidtrans.action';
import { updateTransactionPaymentProofAction } from '@/actions/transaction/updateTransactionPaymentProof.action';
import { updateTransactionStatusAction } from '@/actions/transaction/updateTransactionStatus.action';
import { NextFunction, Request, Response } from 'express';

export class TransactionController {
  async createTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await createTransactionAction(req.body);
      return res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getTransactions(req: Request, res: Response, next: NextFunction) {
    try {
      const page: number = Number(req.query.page);
      const perPage: number = Number(req.query.perPage);
      const result = await getTransactionsAction(page, perPage);
      return res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }
  async getTransactionById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await getTransactionByIdAction(id);
      return res.status(result.status).send(result);
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
      const { id } = req.params;
      const { statusId, reason } = req.body;
      const result = await updateTransactionStatusAction(statusId, id, reason);
      return res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updateTransactionPaymentProof(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const { paymentProof } = req.body;
      const result = await updateTransactionPaymentProofAction(
        id,
        paymentProof,
      );
      return res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getTransactionByDate(req: Request, res: Response, next: NextFunction) {
    try {
      const page: number = Number(req.query.page);
      const perPage: number = Number(req.query.perPage);
      const date: string = String(req.query.date);
      const result = await getTransactionByDateAction(date, page, perPage);
      return res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updateStatusByMidtrans(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const transactionId = req.params.id;
      const transactionStatus = req.body.transactionStatus;
      const result = await updateStatusByMidtransAction({
        transactionId,
        transactionStatus,
      });
      return res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }
  async getTransactionByBranchId(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const page: number = Number(req.query.page);
      const perPage: number = Number(req.query.perPage);
      const branchId: number = Number(req.query.branchId);
      const result = await getTransactionsByBranchIdAction(
        branchId,
        page,
        perPage,
      );
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
