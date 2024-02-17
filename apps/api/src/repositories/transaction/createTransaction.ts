import prisma from '@/prisma';

export const createTransaction = async (transactionId:string, amount:number, statusId: number, address: string, branchId: number, customerId:number) => {
  try {
    const result = await prisma.order.create({
        data: {
            id: transactionId,
            amount,
            address,
            branchId,
            customerId,
            statusId,
        }
    });
    return result;
  } catch (error) {
    throw error;
  }
};
