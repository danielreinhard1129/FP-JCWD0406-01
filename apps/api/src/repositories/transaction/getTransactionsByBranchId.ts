import prisma from '@/prisma';

export const getTransactionsByBranchId = async (
  branchId: number,
  skip: number,
  limit: number,
) => {
  try {
    const result = await prisma.order.findMany({
      where: { branchId: branchId },
      skip: skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        orderItem: {
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
        customer: true,
        status: true,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
