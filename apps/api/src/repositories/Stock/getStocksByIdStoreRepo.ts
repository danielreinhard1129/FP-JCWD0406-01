import { prisma } from '@/helper/prisma';

export const getStocksByIdStoreRepo = async (branchId: number) => {
  try {
    const result = await prisma.stock.findMany({
      where: {
        branchId,
      },
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
