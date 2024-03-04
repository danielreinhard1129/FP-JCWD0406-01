import prisma from '@/prisma';

export const getProducts = async () => {
  try {
    const result = await prisma.product.findMany({
      include: {
        category: true,
        stock: {
          include: {
            storeBranch: true,
          },
        },
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
