import { IProduct } from './product.type';
import { IStoreBranch } from './store.type';

export interface IStock {
  id: number;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  productId: number;
  branchId: number;
  storeBranch: IStoreBranch;
  product: IProduct
}
