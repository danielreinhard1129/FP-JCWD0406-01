import prisma from '@/prisma';

export const createMutationStock = async ({ stocks, transactionId }: any) => {
  const data = stocks.map((stock: any) => ({
    orderId: transactionId,
    stockId: stock.id,
    productId: stock.productId,
    quantity: stock.amount,
    destinationBranchId: stock.branchId,
  }));

  try {
    const result = await prisma.stockMutation.createMany({
      data: data,
    });
    return result;
  } catch (error) {
    throw error;
  }
};
