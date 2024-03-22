import prisma from '@/prisma';

export const getCagetoryByTitle = async (title: string, limit: number) => {
  try {
    const result = await prisma.category.findFirst({
      where: {
        name: title,
      },
      take: limit,
      include: {
        products: true,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
