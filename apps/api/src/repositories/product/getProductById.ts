import prisma from '@/prisma';

export const getProductById = async (id: number) => {
  try {
    const result = await prisma.stock.findUnique({
      where: { productId: id },
      include: {
        product: { include: { category: true } },
        storeBranch: true,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
