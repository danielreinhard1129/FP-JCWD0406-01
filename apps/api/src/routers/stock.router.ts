import { StockController } from '@/controllers/stock.controller';
import { Router } from 'express';

export class StockRouter {
  private router: Router;
  private stockController: StockController;

  constructor() {
    this.stockController = new StockController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/history-stock/:id',
      this.stockController.getHistoriesStock,
    );
    this.router.get('/:id', this.stockController.getStockByIdStore);
    this.router.patch('/:id', this.stockController.updateStock);
  }

  getRouter(): Router {
    return this.router;
  }
}
