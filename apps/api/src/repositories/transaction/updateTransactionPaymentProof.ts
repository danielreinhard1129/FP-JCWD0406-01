import prisma from '@/prisma';

export const updateTransactionPaymentProof = async (
  transactionId: string,
  paymentProof: any,
) => {
  try {
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
