import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export const returnStockById = async (
  stockproducts: any,
  transaction?: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >,
) => {
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
