import prisma from '@/prisma';

export async function findCategoryByNameRepo(name: string) {
  try {
    const result = await prisma.category.findUnique({
      where: {
        name
      }
    });
    return result;
  } catch (error) {
    throw error;
  }
}
