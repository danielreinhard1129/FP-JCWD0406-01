import { IProduct } from "@/types/product.type";

export function calculateTotalAmount(product: IProduct): number {
    let totalAmount = 0;
    for (const stockItem of product?.stocks) {
      totalAmount += stockItem.amount;
    }
    return totalAmount;
}