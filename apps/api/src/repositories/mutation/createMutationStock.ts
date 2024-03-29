import { IStock } from '@/types/stock.type';
import { PrismaClient } from '@prisma/client';

export const createMutationStock = async (
  transactionId: string,
  stocks: IStock[],
  transaction?: any,
) => {
  const data = stocks.map((stock: IStock) => ({
    orderId: transactionId,
    stockId: stock.id,
    productId: stock.productId,
    quantity: stock.amount,
    destinationBranchId: stock.branchId,
  }));

  try {
    const prisma = transaction || new PrismaClient();

    const result = await prisma.stockMutation.createMany({
      data: data,
    });
    return result;
  } catch (error) {
    throw error;
  }
};
