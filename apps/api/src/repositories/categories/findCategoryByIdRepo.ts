import prisma from '@/prisma';

export async function findCategoryByIdRepo(id: number) {
  try {
    const result = await prisma.category.findUnique({
      where: {
        id: parseInt(String(id), 0),
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
}
