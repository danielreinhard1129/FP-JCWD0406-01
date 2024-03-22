import { IOrderItem } from './orderItem.type';
import { IStatus } from './status.type';
import { IUser } from './user.type';

export interface ITransaction {
  id: number;
  orderId: string;
  branchId: number;
  amount: number;
  message: string;
  snapToken: string;
  snapRedirectUrl: string;
  paymentProof: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  statusId: number;
  orderItem: IOrderItem[];
  user: IUser;
  status: IStatus;
}
