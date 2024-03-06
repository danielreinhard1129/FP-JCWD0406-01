import { prisma } from '@/helper/prisma';

export const getStockByIdRepo = async (id: number) => {
  try {
    const result = await prisma.stock.findUnique({
      where: {
        id,
      },
    });
    return result;
  } catch (error) {}
};
