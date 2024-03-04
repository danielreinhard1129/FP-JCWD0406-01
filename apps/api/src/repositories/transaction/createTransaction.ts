import prisma from '@/prisma';

export const createTransaction = async (
  transactionId: string,
  branchId: number,
  amount: number,
  statusId: number,
  address: string,
  customerId: number,
  snap_token: string,
  snap_redirect_url: string,
  message: string,
) => {
  try {
    const result = await prisma.order.create({
      data: {
        order_id: transactionId,
        branchId,
        amount,
        address,
        customerId,
        statusId,
        snap_token,
        snap_redirect_url,
        message,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
