import { IProductRequest } from '@/types/product.type';
import { PrismaClient } from '@prisma/client';

export const updateStockIncrementByProductIdAndBranchId = async (
  branchId: number,
  products: IProductRequest[],
  transaction?: any,
) => {
  try {
    const result = products.map(async (product: IProductRequest) => {
      const productId = product.id;
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
    return result;
  } catch (error) {
    throw error;
  }
};
