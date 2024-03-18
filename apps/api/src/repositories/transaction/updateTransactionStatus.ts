import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export const updateTransactionStatus = async (
  transactionId: string,
  statusId: number,
  transaction?: Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>,
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
