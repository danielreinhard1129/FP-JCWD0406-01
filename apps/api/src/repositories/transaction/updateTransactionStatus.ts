import prisma from '@/prisma';

export const updateTransactionStatus = async (
  transactionId: string,
  statusId: number,
) => {
  try {
    const result = await prisma.order.update({
      where: {
        order_id: transactionId,
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
