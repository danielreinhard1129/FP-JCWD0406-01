import { IProduct } from './product.type';
import { IStoreBranch } from './store.type';

export interface IStock {
  id: number;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  productId: number;
  branchId: number;
  StoreBranch: IStoreBranch;
  product: IProduct;
}

export interface IHistoryStock {
  id: number;
  StockBefore: number;
  StockAfter: number;
  createdAt: string;
  stockId: string;
  stock: IStock;
}
