import prisma from '@/prisma';

export const getProducts = async (limit: number) => {
  try {
    const result = await prisma.product.findMany({
      take: limit,
      include: {
        stocks: true,
      },
      orderBy: { id: 'desc' },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
