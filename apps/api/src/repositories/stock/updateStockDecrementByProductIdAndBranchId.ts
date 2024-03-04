import prisma from '@/prisma';

export const updateStockDecrementByProductIdAndBranchId = async ({
  branchId,
  products,
}: any) => {
  try {
    const result = products.map(async (product: any) => {
      const productId = product.id;
      const quantity = product.quantity;

      const result = await prisma.stock.updateMany({
        where: {
          productId,
          branchId,
        },
        data: {
          amount: {
            decrement: quantity,
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
