import prisma from '@/prisma';

export const getStockMutationByOrderId = async (orderId: string) => {
  try {
    const result = await prisma.stockMutation.findMany({
      where: { orderId },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
