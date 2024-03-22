import { PrismaClient } from '@prisma/client';

export const updateTransactionPaymentProof = async (
  transactionId: string,
  paymentProof: string,
  transaction?: any,
) => {
  try {
    const prisma = transaction || new PrismaClient();

    const result = await prisma.order.update({
      where: { orderId: transactionId },
      data: {
        paymentProof,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
