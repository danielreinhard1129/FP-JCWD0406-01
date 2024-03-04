import prisma from '@/prisma';

export const getTotalTransactionsByDate = async (gte: Date, lte: Date) => {
  try {
    const result = await prisma.order.count({
      where: {
        createdAt: {
          gte,
          lte,
        },
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
