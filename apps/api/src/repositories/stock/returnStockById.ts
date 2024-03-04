import prisma from '@/prisma';

export const returnStockById = async ({ stockproducts }: any) => {
  try {
    stockproducts.map(async (product: any) => {
      const quantity = product.qty;
      const id = product.stockId;

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
