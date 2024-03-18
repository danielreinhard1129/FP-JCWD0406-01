export interface IOrderItem {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  orderId: string;
  productId: number;
}
