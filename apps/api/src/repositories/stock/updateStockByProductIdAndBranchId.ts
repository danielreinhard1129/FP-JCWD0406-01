import prisma from '@/prisma';

export const updateStockByProductIdAndBranchId = async ({ products }: any) => {
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
          amount: quantity,
        },
      });

      console.log({ result });

      return result;
    });

    return result;
  } catch (error) {
    throw error;
  }
};
