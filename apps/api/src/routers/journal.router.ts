import { JournalController } from '@/controllers/journal.controller';
import { Router } from 'express';

export class JournalRouter {
  private router: Router;
  private journalController: JournalController;

  constructor() {
    this.journalController = new JournalController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.journalController.getJournals);
    this.router.get('/filter', this.journalController.getJournalsByBranchId);
  }

  getRouter(): Router {
    return this.router;
  }
}
