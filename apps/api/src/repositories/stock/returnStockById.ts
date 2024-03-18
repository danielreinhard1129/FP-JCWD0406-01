import { PrismaClient } from '@prisma/client';

export const returnStockById = async (stockproducts: any, transaction?: any) => {
  try {
    stockproducts.map(async (product: any) => {
      const quantity = product.quantity;
      const id = product.stockId;

      const prisma = transaction || new PrismaClient();

      const result = await prisma.stock.updateMany({
        where: {
          id,
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
