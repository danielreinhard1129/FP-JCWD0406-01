import { IProductDB } from '@/types/product.type';
import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export const updateReturnStockByProductIdAndBranchId = async (
  products: IProductDB[],
  transaction?: Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>,
) => {
  try {
    const result = products.map(async (product: IProductDB) => {
      const branchId = product.branchId;
      const productId = product.productId;
      const quantity = product.amount;

      const prisma = transaction || new PrismaClient();

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
