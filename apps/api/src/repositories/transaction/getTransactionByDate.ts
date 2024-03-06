import prisma from '@/prisma';

export const getTransactionByDate = async (
  gte: Date,
  lte: Date,
  skip: number,
  perPage: number,
) => {
  try {
    const result = await prisma.order.findMany({
      skip: skip,
      take: perPage,
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        createdAt: {
          gte,
          lte,
        },
      },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                image: true,
              },
            },
          },
        },
        user: true,
        status: true,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
