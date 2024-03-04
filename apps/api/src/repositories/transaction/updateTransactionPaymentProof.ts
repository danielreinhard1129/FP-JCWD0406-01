import prisma from '@/prisma';
export const updateTransactionPaymentProof = async (
  transactionId: string,
  payment_proof: any,
) => {
  try {
    const result = await prisma.order.update({
      where: { order_id: transactionId },
      data: {
        payment_proof,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
