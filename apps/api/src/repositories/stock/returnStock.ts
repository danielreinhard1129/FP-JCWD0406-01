import prisma from '@/prisma';

export const returnStock = async ({ branchId, products }: any) => {
  try {
    products.map(async (product: any) => {
      const productId = product.productId;
      const quantity = product.quantity;

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
