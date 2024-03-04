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

export interface ICustomer {
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
  order_id: string;
  branchId: number;
  amount: number | any;
  message: string;
  snap_token: string;
  snap_redirect_url: string;
  payment_proof: null;
  address: string;
  createdAt: Date | any;
  updatedAt: Date;
  customerId: number;
  statusId: number;
  orderItem: IOrderItem[];
  customer: ICustomer;
  status: IStatus;
}
