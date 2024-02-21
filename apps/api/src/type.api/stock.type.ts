import { IProduct } from './product.type';
import { IStore } from './store.type';

export interface IStock {
  id: number;
  amount: number;
  createdAt?: Date;
  updatedAt?: Date;
  productId: number;
  branchId: number;
}

export interface IHistoryStock {
  id: number;
  StockBefore: number;
  StockAfter: number;
  createdAt: Date;
  stockId: number;
}
