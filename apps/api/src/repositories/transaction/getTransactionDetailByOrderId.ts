import prisma from '@/prisma';

export const getTransactionDetailByOrderId = async (orderId: string) => {
  try {
    const result = await prisma.orderItem.findMany({
      where: {
        orderId,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
