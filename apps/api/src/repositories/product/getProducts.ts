import prisma from '@/prisma';

export const getProducts = async (search: string) => {
  try {
    const result = await prisma.product.findMany({
      where: {
        name: {
          contains: search,
        },
      },
      include: {
        category: true,
        stock: {
          include: {
            StoreBranch: true,
          },
        },
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
