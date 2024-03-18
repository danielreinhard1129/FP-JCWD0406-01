import { getJournalsAction } from '@/actions/journal/getJournals.action';
import { getJournalsByBranchIdAction } from '@/actions/journal/getJournalsByBranchId.action';
import { getTransactionsByBranchIdAction } from '@/actions/transaction/getTransactionsByBranchId';
import { NextFunction, Request, Response } from 'express';

export class JournalController {
  async getJournals(req: Request, res: Response, next: NextFunction) {
    try {
      const page: number = Number(req.query.page);
      const perPage: number = Number(req.query.perPage);
      const result = await getJournalsAction(page, perPage);
      return res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getJournalsByBranchId(req: Request, res: Response, next: NextFunction) {
    try {
      const page: number = Number(req.query.page);
      const perPage: number = Number(req.query.perPage);
      const branchId: number = Number(req.query.branchId);
      const result = await getJournalsByBranchIdAction(branchId, page, perPage);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
