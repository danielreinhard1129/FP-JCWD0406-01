import { PrismaClient } from '@prisma/client';

export const updateTransactionStatus = async (
  transactionId: string,
  statusId: number,
  transaction?: any,
) => {
  try {
    const prisma = transaction || new PrismaClient();

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
