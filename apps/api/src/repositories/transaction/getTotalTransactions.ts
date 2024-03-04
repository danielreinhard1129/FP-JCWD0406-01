import prisma from '@/prisma';

export const getTotalTransactions = async () => {
  try {
    const result = await prisma.order.count();
    return result;
  } catch (error) {
    throw error;
  }
};
