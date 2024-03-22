export interface IProductRequest {
  id: number;
  quantity: number;
}

export interface IProductDB {
  id: number;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  productId: number;
  branchId: number;
  product: {
    id: number;
    name: string;
    price: number;
    amount: number;
  };
}
