import { IStock } from '@/types/stock.type';
import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export const createMutationStock = async (
  transactionId: string,
  stocks: IStock[],
  transaction?: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >,
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
