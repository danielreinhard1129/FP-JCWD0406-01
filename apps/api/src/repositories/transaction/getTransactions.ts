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
        orderItems: true,
        status: true,
        user: true,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
