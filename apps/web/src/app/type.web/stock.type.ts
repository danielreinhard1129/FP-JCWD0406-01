import { IStoreBranch } from './store.type';

export interface IStock {
  id: number;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  productId: number;
  branchId: number;
  StoreBranch: IStoreBranch;
}
