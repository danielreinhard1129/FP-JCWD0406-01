import prisma from '@/prisma';

export const updateReturnStockByProductIdAndBranchId = async ({
  products,
}: any) => {
  try {
    const result = products.map(async (product: any) => {
      const branchId = product.branchId;
      const productId = product.productId;
      const quantity = product.amount;

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
