import prisma from '@/prisma';

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
) => {
  try {
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
