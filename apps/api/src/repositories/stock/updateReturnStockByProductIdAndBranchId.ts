import { IProductDB } from '@/types/product.type';
import { PrismaClient } from '@prisma/client';

export const updateReturnStockByProductIdAndBranchId = async (
  products: IProductDB[],
  transaction?: any,
) => {
  try {
    const result = products.map(async (product: IProductDB) => {
      const branchId = product.branchId;
      const productId = product.productId;
      const quantity = product.amount;

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
