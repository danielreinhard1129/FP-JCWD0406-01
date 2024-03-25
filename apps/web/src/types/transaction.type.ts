export interface IProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface IOrderItem {
  id: number;
  orderId: string;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  product: IProduct;
}

export interface IUser {
  id: number;
  email: string;
  phone: number;
  password: string;
  username: string;
  verified: boolean;
  referralCode: string;
  referrer: string;
  createdAt: Date;
  updatedAt: Date;
  profileId: number;
  addressId: number;
}

export interface IStatus {
  id: number;
  title: string;
}

export interface ITransaction {
  id: number;
  orderId: string;
  branchId: number;
  amount: number | any;
  message: string;
  snapToken: string;
  snapRedirectUrl: string;
  paymentProof: null;
  address: string;
  createdAt: Date | any;
  updatedAt: Date;
  userId: number;
  statusId: number;
  orderItem: IOrderItem[];
  user: IUser;
  status: IStatus;
}
