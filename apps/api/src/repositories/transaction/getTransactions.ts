import prisma from '@/prisma';

export const getTransactions = async (skip: number, limit: number) => {
  try {
    const result = await prisma.order.findMany({
      skip: skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        orderItem: true,
        status: true,
        customer: true,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
