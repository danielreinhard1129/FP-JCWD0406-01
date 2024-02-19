import prisma from '@/prisma';

export async function getAllCategoryRepo() {
  try {
    const result = await prisma.category.findMany({
      include: {
        product: true,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
}
