import { Dispatch, SetStateAction } from 'react';
import { ISelectedAddress } from './address.type';
import { ITransaction } from './transaction.type';
import { IUserState } from './userState.type';
import { ICart } from './cart.type';
import { IJournals } from './journal.type';
import { IStoreBranch } from './branch.type';

export interface IProductDetaiParams {
  id: string;
}

export interface ICategoryParams {
  slug: string;
}

export type TransactionId = string;

export type TransactionStatus = string;

export interface IUseUpdateStatusByMidtransParams {
  transactionId: string;
  transactionStatus: string;
}

export interface IUseGetTransactionByIdParams {
  transactionId: string;
  setTransactionId?: (input: string) => void;
  setTransactions?: (input: ITransaction[]) => void;
  setTotalPage?: (input: number) => void;
  submit?: boolean;
}

export interface IUseUpdateStatusTransactionByIdParams {
  transactionId: string;
  getTransactionById?: () => void;
  reason?: string;
  setUpdate?: (input: any) => void;
}

export interface IUseTransactionsParams {
  setTotalPage: (input: number) => void;
  page: number;
  itemPerPage: number;
  isSuperAdmin?: boolean;
}

export interface IUseGetTransactionsByDateParams {
  pageOfDate: number;
  itemPerPage: number;
  selectedDate: Date;
  setTransactions: (input: ITransaction[]) => void;
  setTotalPage: (input: number) => void;
}

export interface IUseGetBranchByGeolocationParams {
  selectedAddress: ISelectedAddress | null;
}

export interface IUsePaymentByMidtransParams {
  branchId: number;
  total: number;
  selectedAddress?: ISelectedAddress | null;
  setSelectedAddress: Dispatch<SetStateAction<ISelectedAddress | null>>;
  user: IUserState;
  message: string;
  cart: ICart;
  setMessage: (input: string) => void;
  router: any;
}

export interface IUsePaymnetByManualParams {
  branchId: number;
  selectedAddress?: ISelectedAddress | null;
  total: number;
  user: IUserState;
  cart: ICart;
  message: string;
  setMessage: (input: string) => void;
  setSelectedAddress: Dispatch<SetStateAction<ISelectedAddress | null>>;
}

export interface IUseCalculateTotalsParams {
  cart: ICart;
  shipping: number;
  tax: number;
  setTotal: (input: number) => void;
}

export interface ICalculateTotalParams {
  cart: ICart;
  setSubtotal: (input: number) => void;
}

export interface IUseGetTransactionsByBranchIdParams {
  setTotalPage: (input: number) => void;
  setTransactions: (input: ITransaction[]) => void;
  page: number;
  itemPerPage: number;
  selectedBranch: number;
  branchId: number;
}

export interface IUseGetJournalsByBranchIdParams {
  setTotalPage: (input: number) => void;
  setJournals: (input: IJournals[]) => void;
  page: number;
  itemPerPage: number;
  selectedBranch: number;
  branchId: number;
}

export interface IUseGetJournalsParams {
  setTotalPage: (input: number) => void;
  page: number;
  itemPerPage: number;
  isSuperAdmin: boolean;
}

export interface IUseGetBranchsParams {
  setBranches: (input: IStoreBranch[]) => void;
}

export interface IUseGetProductsParams {
  limit: number;
}
