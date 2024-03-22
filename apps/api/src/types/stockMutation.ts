export interface IStockMutation {
  id: number;
  orderId: string;
  productId: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  stockId: number;
  destinationBranchId: number;
}
