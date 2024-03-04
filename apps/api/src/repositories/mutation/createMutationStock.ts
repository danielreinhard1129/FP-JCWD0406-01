import prisma from '@/prisma';

export const createMutationStock = async ({ stocks, transactionId }: any) => {
  const data = stocks.map((stock: any) => ({
    orderId: transactionId,
    stockId: stock.id,
    productId: stock.productId,
    qty: stock.amount,
    destination_BranchId: stock.branchId,
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
