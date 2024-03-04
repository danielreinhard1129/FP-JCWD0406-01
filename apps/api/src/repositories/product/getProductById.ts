import prisma from '@/prisma';

export const getProductById = async (id: number) => {
  try {
    const result = await prisma.product.findUnique({
      where: { id },
      include: {
        stock: {
          include: {
            storeBranch: true,
          },
        },
        category: true,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
