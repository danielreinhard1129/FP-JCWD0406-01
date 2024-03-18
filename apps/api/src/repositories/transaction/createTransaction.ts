import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export const createTransaction = async (
  transactionId: string,
  branchId: number,
  amount: number,
  statusId: number,
  address: string,
  userId: number,
  snapToken: string,
  snapRedirectUrl: string,
  message: string,
  transaction?: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >,
) => {
  try {
    const prisma = transaction || new PrismaClient();

    const result = await prisma.order.create({
      data: {
        orderId: transactionId,
        branchId,
        amount,
        address,
        userId,
        statusId,
        snapToken,
        snapRedirectUrl,
        message,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
