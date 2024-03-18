import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export const updateTransactionPaymentProof = async (
  transactionId: string,
  paymentProof: string,
  transaction?: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >,
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
