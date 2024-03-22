import { IProductRequest } from './product.type';

export interface InvalidPaymentProofParams {
  user: string;
  orderId: string;
  to: string;
}

export interface IPaymentConfirmedParams {
  user: string;
  orderId: string;
  to: string;
}

export interface IOrderSendParams {
  user: string;
  orderId: string;
  to: string;
}

export interface IOrderCancelParams {
  user: string;
  orderId: string;
  to: string;
}

export interface IOrderDeliveredParams {
  user: string;
  orderId: string;
  to: string;
}

export interface IPaymentReceivedVerificationParams {
  user: string;
  orderId: string;
  to: string;
}

export interface updateStatusByMidtransParams {
  transactionId: string;
  transactionStatus: string;
}

export interface ICreateTransactionParams {
  products: IProductRequest[];
  address: string;
  amount: number;
  userId: number;
  message: string;
  branchId: number;
}

export interface IGetStocksByProductIdParams {
  products: IProductRequest[];
}

export interface IGetStocksByProductIdAndBranchIdParams {
  products: IProductRequest[];
  branchId: number;
}

export interface IPaymentRequiredParams {
  user: string;
  orderId: string;
  to: string;
}
