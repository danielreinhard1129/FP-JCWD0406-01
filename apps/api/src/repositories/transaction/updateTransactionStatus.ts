import prisma from '@/prisma';

export const updateTransactionStatus = async (
  transactionId: string,
  statusId: number,
) => {
  try {
    const result = await prisma.order.update({
      where: {
        orderId: transactionId,
      },
      data: {
        statusId,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
