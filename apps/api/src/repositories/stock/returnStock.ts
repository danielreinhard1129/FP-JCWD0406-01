import { IOrderItem } from '@/types/orderItem.type';
import { PrismaClient } from '@prisma/client';
export const returnStock = async (
  branchId: number,
  products: any,
  transaction?: any,
) => {
  try {
    products.map(async (product: IOrderItem) => {
      const productId = product.productId;
      const quantity = product.quantity;

      const prisma = transaction || new PrismaClient();

      const result = await prisma.stock.updateMany({
        where: {
          productId,
          branchId,
        },
        data: {
          amount: {
            increment: quantity,
          },
        },
      });

      return result;
    });
  } catch (error) {
    throw error;
  }
};
